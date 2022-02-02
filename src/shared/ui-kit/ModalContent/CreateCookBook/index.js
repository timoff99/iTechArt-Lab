import React from "react";

import { Box } from "../../../helpers/Box";
import { Heading } from "../../../helpers/Text";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { HorizontalCard } from "../../HorizontalCard";
import { createCookBookData } from "./mockData";
import { Textarea } from "../../Textarea";

export const CreateCookBook = ({ cookBookResepies }) => {
  return (
    <Box px={56} py={72}>
      <Heading as={"h2"} bold mb={10}>
        Create New CookBook
      </Heading>
      <Input labelBold="labelBold" {...createCookBookData[0]} require />
      <Button size="md" variant="primary" mb={10}>
        Upload CookBook Image
      </Button>
      <Textarea labelBold {...createCookBookData[1]} />
      <Input labelBold="labelBold" {...createCookBookData[2]} />

      {cookBookResepies.map((props, index) => {
        return <HorizontalCard key={index} place={"no-rates"} {...props} />;
      })}
    </Box>
  );
};
