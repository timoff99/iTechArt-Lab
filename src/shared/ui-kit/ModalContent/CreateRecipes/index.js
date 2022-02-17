import React, { useState, useRef, memo } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";

import { recipeApi } from "../../../../services/recipe.service";
import ImageService from "../../../../services/image.service";

import { Flex, FlexColumn } from "../../../helpers/Flex";
import { Box } from "../../../helpers/Box";
import { Heading, Paragraph } from "../../../helpers/Text";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Textarea } from "../../Textarea";
import { ReactComponent as SmallX } from "../../../../static/icons/smallX.svg";
import { createRecipeData } from "./mockData";

const X = styled(SmallX)`
  display: inline-block;
  margin-left: 30px;
`;

const FileUploader = styled(Box)`
  display: none;
`;

export const CreateRecipes = memo(({ setShowModal }) => {
  const [cookbookImage, setCookbookImage] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [addRecipe] = recipeApi.useAddRecipeMutation();
  const formData = new FormData();
  const refFileInput = useRef();

  const setImage = (e) => {
    setCookbookImage(e.target.files[0]);
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

  const createRecipe = async (values) => {
    try {
      const image = await CreateImage();
      const { title, description } = values;
      const recipesData = { title, description, image, steps, ingredients };
      addRecipe(recipesData);
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
  const handleAdd = (e) => {
    if (e.key === "Enter") {
      console.log(ingredients);
      e.preventDefault();
      if (e.target.name === "steps") {
        setSteps((prev) => [...prev, e.target.value]);
      } else if (e.target.name === "ingredients") {
        setIngredients((prev) => [...prev, e.target.value]);
      }
      e.target.value = "";
    }
  };

  const handleCloseSteps = (deleteItem) => {
    const updatedSteps = steps.filter((item) => item !== deleteItem);
    setSteps(updatedSteps);
  };
  const handleCloseIngredients = (deleteItem) => {
    const updatedIngredients = ingredients.filter((item) => item !== deleteItem);
    setIngredients(updatedIngredients);
  };
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
      }}
      onSubmit={async (values) => {
        await createRecipe(values);
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
            <Input
              handleChange={handleChange}
              labelBold="labelBold"
              {...createRecipeData[2]}
              onKeyPress={(e) => handleAdd(e)}
            />
            <FlexColumn mb={10}>
              {ingredients.map((ingredient, index) => (
                <Paragraph key={index}>
                  {ingredient}
                  <X onClick={() => handleCloseIngredients(ingredient)} />
                </Paragraph>
              ))}
            </FlexColumn>

            <Input
              handleChange={handleChange}
              labelBold="labelBold"
              {...createRecipeData[3]}
              onKeyPress={(e) => handleAdd(e)}
            />
            <FlexColumn mb={10}>
              {steps.map((step, index) => (
                <Paragraph key={index}>
                  {step}
                  <X onClick={() => handleCloseSteps(step)} />
                </Paragraph>
              ))}
            </FlexColumn>

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
});
