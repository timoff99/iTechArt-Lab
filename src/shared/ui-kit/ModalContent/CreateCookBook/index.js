import React, { useState, useEffect, useRef, memo } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";

import {
  useUpdateRecipeCookBookIdMutation,
  useDeleteRecipesCookBookIdMutation,
  useGetRecipeWithoutCookBookQuery,
  useLazyGetRecipeQuery,
} from "../../../../services/recipe.service";
import { useAddCookBookMutation, useUpdateCookBookMutation } from "../../../../services/cookbook.service";
import ImageService from "../../../../services/image.service";

import { Box } from "../../../helpers/Box";
import { Heading } from "../../../helpers/Text";
import { Flex } from "../../../helpers/Flex";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { HorizontalCard } from "../../HorizontalCard";
import { Textarea } from "../../Textarea";
import { MultiSelect } from "../../MultiSelect";

import { createCookBookData, CheckboxData } from "./mockData";
import { Modal } from "../../Modal";
import { Recipes } from "../Recipes";

const FileUploader = styled(Box)`
  display: none;
`;

export const CreateCookBook = memo(
  ({ setShowModal, _id, oldTitle, oldDescription, types, oldRecipes, oldImage, update, setUpdate, ...props }) => {
    const [recipeShowModal, setRecipeShowModal] = useState(false);
    const [allAvailableRecipes, setAllAvailableRecipes] = useState([]);
    const [selectedRecipes, SetSelectedRecipes] = useState([]);
    const [oldCookbookRecipes, SetOldCookbookRecipes] = useState("");
    const [cookbookImage, setCookbookImage] = useState("");
    const [checkbox, setCheckbox] = useState(CheckboxData);

    const [addCookBook] = useAddCookBookMutation();
    const [updateCookBook] = useUpdateCookBookMutation();
    const [updateRecipesCookBookId] = useUpdateRecipeCookBookIdMutation();
    const [deleteRecipesCookBookId] = useDeleteRecipesCookBookIdMutation();
    const { data: recipeWithCookbook } = useGetRecipeWithoutCookBookQuery();
    const [action, { data: recipe }] = useLazyGetRecipeQuery();

    const openRecipe = (_id) => {
      action(_id, true);
      recipeToggleModal();
    };

    const recipeToggleModal = () => {
      setRecipeShowModal((prev) => !prev);
    };

    const formData = new FormData();
    const refFileInput = useRef();

    const loadRecipes = () => {
      const listOfRecipes = recipeWithCookbook?.map((el) => {
        return { ...el, label: el.title, value: el._id };
      });

      const currentRecipes = oldRecipes?.map((recipe) => {
        return { ...recipe, label: recipe.title, value: recipe._id };
      });
      SetOldCookbookRecipes(currentRecipes);

      if (currentRecipes) {
        SetSelectedRecipes(currentRecipes);
        return listOfRecipes && setAllAvailableRecipes((prev) => [...prev, ...currentRecipes, ...listOfRecipes]);
      }
      return listOfRecipes && setAllAvailableRecipes((prev) => [...prev, ...listOfRecipes]);
    };
    useEffect(() => {
      loadRecipes();
    }, [recipeWithCookbook]);

    useEffect(() => {
      if (types) {
        setCheckbox((prev) =>
          prev.map((el) => {
            return types.includes(el.value) ? { ...el, checked: !el.checked } : el;
          })
        );
      }
    }, []);

    const setImage = (e) => {
      setCookbookImage(e.target.files[0]);
    };

    const handleSelectedRecipes = (recipes) => {
      SetSelectedRecipes(recipes);
    };

    const createImage = async () => {
      try {
        formData.append("image", cookbookImage);
        const image = await ImageService.addImage(formData);
        return image.data;
      } catch (error) {
        console.log("error occurred  while uploading image", error);
      }
      return true;
    };

    const createCookBook = async (values) => {
      try {
        let newImage;
        if (!oldImage?.includes("http")) {
          newImage = await createImage();
        } else if (cookbookImage) {
          newImage = await createImage();
        }
        const { title, description } = values;
        const cookbookTypes = checkbox.reduce((result, curr) => {
          if (curr.checked) {
            return [...result, curr.value];
          }
          return result;
        }, []);
        const cookbookData = {
          _id,
          title,
          description,
          selectedRecipes,
          image: newImage ? newImage : oldImage,
          cookbookTypes,
        };
        if (update) {
          await deleteRecipesCookBookId({ selectedRecipes: oldCookbookRecipes, _id });
          await updateCookBook(cookbookData);
          updateRecipesCookBookId({ selectedRecipes, _id });
          setShowModal();
          return setUpdate(false);
        } else {
          const recept = await addCookBook(cookbookData);
          const { _id } = recept.data;
          updateRecipesCookBookId({ selectedRecipes, _id });
          setShowModal();
        }
      } catch (error) {
        console.log("error cookBook", error);
      }
      return true;
    };

    const handleClickFileUploader = (e) => {
      e.preventDefault();
      refFileInput.current.click();
    };

    const handleTypeChange = (e) => {
      setCheckbox((prev) =>
        prev.map((el) => {
          return el.value === e.target.value ? { ...el, checked: !el.checked } : el;
        })
      );
    };

    return (
      <>
        <Formik
          initialValues={{
            title: "",
            description: oldDescription || "",
          }}
          onSubmit={async (values) => {
            await createCookBook(values);
          }}
        >
          {({ handleChange }) => (
            <Form>
              <Box px={56} py={72}>
                <Heading as={"h2"} bold mb={10}>
                  Create New CookBook
                </Heading>
                <Input
                  handleChange={handleChange}
                  defaultValue={oldTitle}
                  labelBold="labelBold"
                  {...createCookBookData[0]}
                  require
                />
                <FileUploader
                  as="input"
                  ref={refFileInput}
                  type="file"
                  id="img"
                  name="img"
                  onChange={(e) => setImage(e)}
                />
                <Button size="md" variant="primary" mb={10} onClick={handleClickFileUploader}>
                  Upload CookBook Image
                </Button>
                <Textarea labelBold {...createCookBookData[1]} />
                <Box>
                  <Heading as={"h3"} fontSize={16} semiBold mb={3} color="secondary.main">
                    CookBook Types
                  </Heading>
                  <Flex as="form">
                    {checkbox.map(({ value, children, checked }, index) => {
                      return (
                        <Box as="label" mr={5} key={index}>
                          <Box
                            mr={1}
                            key={index}
                            as="input"
                            onChange={handleTypeChange}
                            type="checkbox"
                            name="fruit"
                            value={value}
                            checked={checked}
                          />
                          {children}
                        </Box>
                      );
                    })}
                  </Flex>
                </Box>
                <Heading as={"h3"} fontSize={16} semiBold my={3} color="secondary.main">
                  Recipe
                </Heading>
                <MultiSelect
                  options={allAvailableRecipes}
                  value={selectedRecipes}
                  onChange={handleSelectedRecipes}
                  placeholder={"Recipe Title"}
                />

                {selectedRecipes &&
                  selectedRecipes.map((props, index) => {
                    return <HorizontalCard key={index} openRecipe={openRecipe} place={"no-rates"} {...props} />;
                  })}
                <Flex justifyContent="flex-end" mt={11}>
                  <Button size="md" variant="outlined" mr={10} onClick={setShowModal}>
                    Cancel
                  </Button>
                  <Button size="md" variant="primary" type="submit">
                    Confirm
                  </Button>
                </Flex>
              </Box>
            </Form>
          )}
        </Formik>
        {recipeShowModal && (
          <Modal showModal={recipeShowModal} setShowModal={recipeToggleModal}>
            <Recipes {...recipe} />
          </Modal>
        )}
      </>
    );
  }
);
