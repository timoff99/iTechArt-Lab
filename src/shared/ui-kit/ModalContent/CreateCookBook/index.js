import React, { useState, useEffect, useRef, memo } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";

import { recipeApi } from "../../../../services/recipe.service";
import { cookBookApi } from "../../../../services/cookbook.service";
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
  display: none;
`;

export const CreateCookBook = memo(({ setShowModal }) => {
  const [allAvailableRecipes, setAllAvailableRecipes] = useState([]);
  const [selectedRecipes, SetSelectedRecipes] = useState([]);
  const [cookbookImage, setCookbookImage] = useState("");
  const [addCookBook] = cookBookApi.useAddCookBookMutation();
  const { data: recipeWithCookbook } = recipeApi.useGetRecipeWithoutCookBookQuery();
  const [updateRecipesCookBookId] = recipeApi.useUpdateRecipeCookBookIdMutation();
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
      const cookbookData = { title, description, selectedRecipes };
      console.log(cookbookData);
      const recept = await addCookBook(formData, cookbookData);
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
