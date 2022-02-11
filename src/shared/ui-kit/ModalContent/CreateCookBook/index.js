import React, { useState, useEffect, useRef, memo } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";

import RecipeService from "../../../../services/recipe.service";
import CookBookService from "../../../../services/cookbook.service";
import ImageService from "../../../../services/image.service";

import { Box } from "../../../helpers/Box";
import { Heading } from "../../../helpers/Text";
import { Flex } from "../../../helpers/Flex";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { HorizontalCard } from "../../HorizontalCard";
import { Textarea } from "../../Textarea";
import { MultiSelect } from "../../MultiSelect";

import { createCookBookData } from "./mockData";

const FileUploader = styled(Box)`
  display: block;
`;

export const CreateCookBook = memo(({ setShowModal }) => {
  const [allAvailableRecipes, setAllAvailableRecipes] = useState([]);
  const [selectedRecipes, SetSelectedRecipes] = useState([]);
  const formData = new FormData();
  const refFileInput = useRef();

  const loadRecipes = async () => {
    const userRecipe = await RecipeService.getRecipeWithoutCookBook();
    const listOfRecipes = userRecipe.data.map((el) => {
      return { ...el, label: el.title, value: el._id };
    });
    setAllAvailableRecipes((prev) => [...prev, ...listOfRecipes]);
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const setImage = (e) => {
    formData.append("image", e.target.files[0]);
  };

  const handleSelectedRecipes = (recipes) => {
    SetSelectedRecipes([...recipes]);
  };

  const CreateImage = async () => {
    try {
      const image = await ImageService.addImage(formData);
      return image;
    } catch (error) {
      console.log("error occurred  while uploading image", error);
    }
    return true;
  };
  const createCookBook = async (values, image) => {
    try {
      const { title, description } = values;
      const recept = await CookBookService.addCookBook(title, description, image, selectedRecipes);
      console.log("cookBook upl seccess");
    } catch (error) {
      console.log("error cookBook", error);
    }
    return true;
  };
  const handleClickFileUploader = (e) => {
    e.preventDefault();
    refFileInput.current.click();
  };
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
      }}
      onSubmit={async (values) => {
        const image = await CreateImage();
        await createCookBook(values, image.data);
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
