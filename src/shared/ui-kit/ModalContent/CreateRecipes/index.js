import React, { useRef } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";

import RecipeService from "../../../../services/recipe.service";
import CookBookService from "../../../../services/cookbook.service";
import ImageService from "../../../../services/image.service";

import { Flex, FlexColumn } from "../../../helpers/Flex";
import { Box } from "../../../helpers/Box";
import { Heading, Paragraph } from "../../../helpers/Text";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Textarea } from "../../Textarea";

import { createRecipeData } from "./mockData";

const X = styled(Box)`
  display: inline-block;
  margin-left: 30px;
`;

const FileUploader = styled(Box)`
  display: none;
`;

export const CreateRecipes = ({ setShowModal }) => {
  const formData = new FormData();
  const refFileInput = useRef();

  const setImage = (e) => {
    formData.append("image", e.target.files[0]);
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

  const createRecipe = async (values, image) => {
    try {
      const { title, description } = values;
      const recept = await RecipeService.addRecipe(title, description, image);
      console.log("recept upl seccess");
    } catch (error) {
      console.log("error recept", error);
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
        ingredients: "",
        directions: "",
      }}
      onSubmit={async (values) => {
        const image = await CreateImage();
        await createRecipe(values, image.data);
      }}
    >
      {({ handleChange }) => (
        <Form>
          <Box px={56} py={72}>
            <Heading as={"h2"} bold mb={10}>
              Create New Recipe
            </Heading>
            <Input handleChange={handleChange} labelBold="labelBold" {...createRecipeData[0]} require />

            <FileUploader as="input" ref={refFileInput} type="file" id="img" name="img" onChange={(e) => setImage(e)} />
            <Button size="md" variant="primary" mb={10} onClick={handleClickFileUploader}>
              Upload Recipe Image
            </Button>

            <Textarea labelBold {...createRecipeData[1]} />
            <Input handleChange={handleChange} labelBold="labelBold" {...createRecipeData[2]} />
            <Paragraph>
              first ingredient, 100g <X>X</X>
            </Paragraph>
            <Paragraph>
              fourth ingredient, 250g <X>X</X>
            </Paragraph>
            <Paragraph>
              third ingredient, 1400g <X>X</X>
            </Paragraph>
            <Paragraph mb={10}>
              fourth ingredient, 250g <X>X</X>
            </Paragraph>
            <Textarea labelBold {...createRecipeData[3]} />
            <Flex justifyContent="flex-end">
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
};
