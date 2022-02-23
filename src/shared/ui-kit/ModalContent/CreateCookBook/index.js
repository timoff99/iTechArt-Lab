import React, { useState, useEffect, useRef, memo } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";

import {
  useGetRecipeWithoutCookBookQuery,
  useUpdateRecipeCookBookIdMutation,
} from "../../../../services/recipe.service";
import { useAddCookBookMutation } from "../../../../services/cookbook.service";
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

const FileUploader = styled(Box)`
  display: none;
`;

export const CreateCookBook = memo(({ setShowModal }) => {
  const [allAvailableRecipes, setAllAvailableRecipes] = useState([]);
  const [selectedRecipes, SetSelectedRecipes] = useState([]);
  const [checkbox, setCheckbox] = useState(CheckboxData);
  const [cookbookImage, setCookbookImage] = useState("");
  const [addCookBook] = useAddCookBookMutation();
  const { data: recipeWithCookbook } = useGetRecipeWithoutCookBookQuery();
  const [updateRecipesCookBookId] = useUpdateRecipeCookBookIdMutation();
  const formData = new FormData();
  const refFileInput = useRef();

  const loadRecipes = async () => {
    const listOfRecipes = recipeWithCookbook?.map((el) => {
      return { ...el, label: el.title, value: el._id };
    });
    listOfRecipes && setAllAvailableRecipes((prev) => [...prev, ...listOfRecipes]);
  };

  useEffect(() => {
    loadRecipes();
  }, [recipeWithCookbook]);

  const setImage = (e) => {
    setCookbookImage(e.target.files[0]);
  };

  const handleSelectedRecipes = (recipes) => {
    SetSelectedRecipes([...recipes]);
  };

  const CreateImage = async () => {
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
      const image = await CreateImage();
      const { title, description } = values;
      const cookbookTypes = checkbox.reduce((result, curr) => {
        if (curr.checked) {
          return [...result, curr.value];
        }
        return result;
      }, []);
      const cookbookData = { title, description, selectedRecipes, image, cookbookTypes };
      console.log(cookbookData);
      const recept = await addCookBook(cookbookData);
      console.log(recept);
      const { _id } = recept.data;
      console.log(_id, selectedRecipes);
      console.log("cookBook upl seccess");
      updateRecipesCookBookId({ selectedRecipes, _id });
      console.log("cookBook_id add seccess");
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
    <Formik
      initialValues={{
        title: "",
        description: "",
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
            <Input handleChange={handleChange} labelBold="labelBold" {...createCookBookData[0]} require />
            <FileUploader as="input" ref={refFileInput} type="file" id="img" name="img" onChange={(e) => setImage(e)} />
            <Button size="md" variant="primary" mb={10} onClick={handleClickFileUploader}>
              Upload CookBook Image
            </Button>
            <Textarea labelBold {...createCookBookData[1]} />
            <Box>
              <Heading as={"h3"} fontSize={16} semiBold mb={3} color="secondary.main">
                CookBook Types
              </Heading>
              <Flex as="form">
                {checkbox.map(({ value, children }, index) => {
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
                return <HorizontalCard key={index} place={"no-rates"} {...props} />;
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
  );
});
