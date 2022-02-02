import React from "react";
import styled from "styled-components";

import { Box } from "../../../helpers/Box";
import { Heading, Paragraph } from "../../../helpers/Text";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { createRecipeData } from "./mockData";
import { Textarea } from "../../Textarea";
import { Flex, FlexColumn } from "../../../helpers/Flex";

const X = styled(Box)`
  display: inline-block;
  margin-left: 30px;
`;

export const CreateRecipes = () => {
  return (
    <Box px={56} py={72}>
      <Heading as={"h2"} bold mb={10}>
        Create New Recipe
      </Heading>
      <Input labelBold="labelBold" {...createRecipeData[0]} require />
      <Button size="md" variant="primary" mb={10}>
        Upload Recipe Image
      </Button>
      <Textarea labelBold {...createRecipeData[1]} />
      <Input labelBold="labelBold" {...createRecipeData[2]} />
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
        <Button size="md" variant="outlined" mr={10}>
          Cancel
        </Button>
        <Button size="md" variant="primary">
          Confirm
        </Button>
      </Flex>
    </Box>
  );
};
