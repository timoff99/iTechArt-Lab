import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";

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
import UserService from "../../../../services/user.service";

const FileUploader = styled(Box)`
  display: none;
`;

const cookbookSchema = yup.object().shape({
  title: yup.string().trim().required(),
  file: yup.mixed().required("File is required"),
});

export const CreateCookBook = memo(
  ({ setShowModal, _id, oldTitle, oldDescription, types, oldRecipes, oldImage, update, setUpdate, ...props }) => {
    const [recipeShowModal, setRecipeShowModal] = useState(false);
    const [allAvailableRecipes, setAllAvailableRecipes] = useState([]);
    const [selectedRecipes, SetSelectedRecipes] = useState([]);
    const [oldCookbookRecipes, SetOldCookbookRecipes] = useState("");
    const [checkbox, setCheckbox] = useState(CheckboxData);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(oldImage ? oldImage : "");

    const [addCookBook] = useAddCookBookMutation();
    const [updateCookBook] = useUpdateCookBookMutation();
    const [updateRecipesCookBookId] = useUpdateRecipeCookBookIdMutation();
    const [deleteRecipesCookBookId] = useDeleteRecipesCookBookIdMutation();
    const { data: recipeWithCookbook } = useGetRecipeWithoutCookBookQuery();
    const [action, { data: recipe }] = useLazyGetRecipeQuery();

    const openRecipe = (_id) => {
      action({ _id }, true);
      recipeToggleModal();
    };

    const recipeToggleModal = () => {
      setRecipeShowModal((prev) => !prev);
    };

    const formData = new FormData();

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
      return () => {
        SetOldCookbookRecipes("");
      };
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

    const handleSelectedRecipes = (recipes) => {
      SetSelectedRecipes(recipes);
    };

    const createImage = async (fileImage) => {
      try {
        formData.append("image", fileImage);
        const image = await ImageService.addImage(formData);
        return image.data;
      } catch (error) {
        console.log("error occurred  while uploading image", error);
      }
      return true;
    };

    const createCookBook = async (values) => {
      try {
        setLoading(true);
        let newImage;
        if (values.file === oldImage) {
          newImage = "";
        } else if (values.file) {
          newImage = await createImage(values.file);
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
          await UserService.updateUserCookBooks(_id);
          setShowModal();
          setUpdate(false);
        } else {
          const recept = await addCookBook(cookbookData);
          const { _id } = recept.data;
          updateRecipesCookBookId({ selectedRecipes, _id });

          await UserService.updateUserCookBooks(_id);
          setShowModal();
        }
      } catch (error) {
        console.log("error cookBook", error);
      } finally {
        setLoading(false);
      }
      return true;
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
            title: oldTitle || "",
            file: oldImage || "",
            description: oldDescription || "",
            recipes: oldRecipes || [],
          }}
          validationSchema={cookbookSchema}
          onSubmit={async (values) => {
            await createCookBook(values);
          }}
        >
          {({ handleChange, setFieldValue, values, initialValues }) => (
            <Form>
              <Box px={[4, 56, 56]} py={[10, 72, 72]}>
                <Heading as={"h2"} bold mb={10}>
                  Create New CookBook
                </Heading>
                <Input
                  handleChange={handleChange}
                  defaultValue={oldTitle}
                  labelBold="labelBold"
                  {...createCookBookData[0]}
                  labelSize={"sm"}
                  require
                />
                <Box color="red" mb={10}>
                  {<ErrorMessage name={"title"} />}
                </Box>
                <label htmlFor="contained-button-file" style={{ display: "inline-flex", flexDirection: "column" }}>
                  <FileUploader
                    as="input"
                    id="contained-button-file"
                    type="file"
                    name="img"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFieldValue("file", file);
                      setImage(URL.createObjectURL(file));
                    }}
                  />
                  <Box
                    as="img"
                    style={{
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    maxWidth="210px"
                    maxHeight="210px"
                    width="100%"
                    borderRadius="8px"
                    mb="2"
                    alt=""
                    src={image}
                  />
                  <Button size="md" variant="primary" id="contained-button-file" as="span">
                    Upload CookBook Image
                  </Button>
                </label>
                <Box color="red" mb={10}>
                  {<ErrorMessage name={"file"} />}
                </Box>
                <Textarea labelBold {...createCookBookData[1]} />
                <Box>
                  <Heading as={"h3"} fontSize={16} semiBold mb={3} color="secondary.main">
                    CookBook Types
                  </Heading>
                  <Flex as="form" flexWrap={"wrap"}>
                    {checkbox.map(({ value, children, checked }, index) => {
                      return (
                        <Box as="label" mr={5} mb={3} key={index}>
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
                  onChange={(recipes) => {
                    handleSelectedRecipes(recipes);
                    setFieldValue("recipes", recipes);
                  }}
                  placeholder={"Recipe Title"}
                />

                {selectedRecipes &&
                  selectedRecipes.map((props, index) => {
                    return <HorizontalCard key={index} openRecipe={openRecipe} place={"no-rates"} {...props} />;
                  })}
                <Flex justifyContent={["space-between", "flex-end", "flex-end"]} mt={11}>
                  <Button size="md" variant="outlined" mr={[0, 10, 10]} onClick={setShowModal}>
                    Cancel
                  </Button>
                  <Button
                    disabled={values === initialValues}
                    size="md"
                    variant="primary"
                    mr={[0, 10, 10]}
                    type="submit"
                    loading={+loading}
                  >
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
