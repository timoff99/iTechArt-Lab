import React from "react";
import styled from "styled-components";

import { Flex } from "../../helpers/Flex";
import { Heading } from "../../helpers/Text";
import { Button } from "../Button";
import { Input } from "../Input";
import { ReactComponent as Send } from "../../../static/icons/send.svg";
import { Box } from "../../helpers/Box";
import { userComments } from "./mockData";
import { CommentsCard } from "./CommentsCard";

const StyledSend = styled(Send)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Comments = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    e.target[0].value = "";
  };
  return (
    <>
      <Heading as={"h3"} semiBold mb={8}>
        Comments (count)
      </Heading>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Flex>
          <Input
            type="text"
            name="comments"
            placeholder="Express yourself..."
            variantInput="commentsInput"
            variantLabel="commentsLabel"
            labelSize="sm"
          />

          <Button size="sm" ml={5}>
            <StyledSend />
          </Button>
        </Flex>
      </form>
      <Box>
        {userComments.map((props, index) => {
          return <CommentsCard key={index} {...props} />;
        })}
      </Box>
    </>
  );
};
