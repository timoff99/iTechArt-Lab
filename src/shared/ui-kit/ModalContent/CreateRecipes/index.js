import React, { useState, useRef, memo } from "react";
import styled from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";

import { useAddRecipeMutation, useUpdateRecipeMutation } from "../../../../services/recipe.service";
import ImageService from "../../../../services/image.service";
import UserService from "../../../../services/user.service";

import { Flex, FlexBetween } from "../../../helpers/Flex";
import { Box } from "../../../helpers/Box";
import { Heading, Paragraph } from "../../../helpers/Text";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Textarea } from "../../Textarea";
import { ReactComponent as SmallX } from "../../../../static/icons/smallX.svg";
import { createRecipeData } from "./mockData";
import { Slider } from "../../Slider";
import theme from "../../../../theme";

const X = styled(SmallX)`
  display: inline-block;
  margin-left: 30px;
`;

const FileUploader = styled(Box)`
  display: none;
`;

const recipeSchema = yup.object().shape({
  title: yup.string().trim().required(),
  file: yup.mixed().required("File is required"),
});

export const CreateRecipes = memo(
  ({
    setShowModal,
    _id,
    oldTitle,
    oldDescription,
    oldCooking_time,
    oldSteps,
    oldIngredients,
    oldImage,
    update,
    setUpdate,
    ...props
  }) => {
    const [ingredients, setIngredients] = useState(oldIngredients || []);
    const [steps, setSteps] = useState(oldSteps || []);
    const [time, setTime] = useState(oldCooking_time || 0);
    const [loading, setLoading] = useState(false);

    const [addRecipe] = useAddRecipeMutation();
    const [updateRecipe] = useUpdateRecipeMutation();
    const formData = new FormData();
    const refFileInput = useRef();
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

    const createRecipe = async (values) => {
      try {
        setLoading(true);
        let newImage;
        if (!oldImage?.includes("http")) {
          newImage = await createImage(values.file);
        } else if (values.file) {
          newImage = await createImage(values.file);
        }
        const { title, description } = values;
        const recipesData = {
          _id,
          title,
          description,
          image: newImage ? newImage : oldImage,
          steps,
          ingredients,
          cooking_time: time,
        };
        if (update) {
          updateRecipe(recipesData);
          await UserService.updateUserRecipes(_id);
          setShowModal();
          return setUpdate(false);
        }
        const newRecipe = await addRecipe(recipesData);
        await UserService.updateUserRecipes(newRecipe.data._id);
        setShowModal();
      } catch (error) {
        console.log("error recept", error);
      } finally {
        setLoading(false);
      }
      return true;
    };
    const handleClickFileUploader = (e) => {
      e.preventDefault();
      refFileInput.current.click();
    };
    const handleAdd = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (e.target.value.trim() === "") return;
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
          title: oldTitle || "",
          file: "",
          description: oldDescription || "",
          steps: "",
          ingredients: "",
        }}
        validationSchema={recipeSchema}
        onSubmit={async (values) => {
          await createRecipe(values);
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <Box px={[4, 56, 56]} py={[10, 72, 72]}>
              <Heading as={"h2"} bold mb={10}>
                Create New Recipe
              </Heading>
              <Input
                handleChange={handleChange}
                defaultValue={oldTitle}
                labelBold="labelBold"
                {...createRecipeData[0]}
                labelSize={"sm"}
                require
              />
              <Box color="red" mb={10}>
                {<ErrorMessage name={"title"} />}
              </Box>

              <FileUploader
                as="input"
                ref={refFileInput}
                type="file"
                id="file"
                name="file"
                onChange={(e) => setFieldValue("file", e.currentTarget.files[0])}
              />
              <Button size="md" variant="primary" onClick={handleClickFileUploader}>
                Upload Recipe Image
              </Button>
              <Box color="red" mb={10}>
                {<ErrorMessage name={"file"} />}
              </Box>

              <Textarea labelBold {...createRecipeData[1]} />
              <Box mb={11}>
                <Paragraph mb={2} ml={1} semiBold fontSize={1} fontFamily={theme.fonts.header} color="secondary.main">
                  Cooking Time
                </Paragraph>
                <Slider timeRange={time} setTimeRange={setTime} type="create" />
              </Box>
              <Input
                labelBold="labelBold"
                {...createRecipeData[2]}
                values={values.steps}
                onKeyPress={handleAdd}
                handleChange={handleChange}
              />
              <Box mb={10} minWidth={170} width="fit-content">
                {ingredients.map((ingredient, index) => (
                  <FlexBetween key={index}>
                    <Paragraph>{ingredient}</Paragraph>
                    <X onClick={() => handleCloseIngredients(ingredient)} />
                  </FlexBetween>
                ))}
              </Box>

              <Input
                labelBold="labelBold"
                {...createRecipeData[3]}
                values={values.ingredients}
                onKeyPress={handleAdd}
                handleChange={handleChange}
              />
              <Box mb={10} minWidth={170} width="fit-content">
                {steps.map((step, index) => (
                  <FlexBetween key={index}>
                    <Paragraph>{step}</Paragraph>
                    <X onClick={() => handleCloseSteps(step)} />
                  </FlexBetween>
                ))}
              </Box>

              <Flex justifyContent="flex-end">
                <Button size="md" variant="outlined" mr={10} onClick={setShowModal}>
                  Cancel
                </Button>
                <Button size="md" variant="primary" type="submit" loading={+loading}>
                  Confirm
                </Button>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    );
  }
);
