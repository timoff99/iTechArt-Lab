import React from "react";
import styled from "styled-components";

import { Flex } from "../../helpers/Flex";
import { Heading } from "../../helpers/Text";
import { Button } from "../Button";
import { Input } from "../Input";
import { ReactComponent as Send } from "../../../static/icons/send.svg";
import { Box } from "../../helpers/Box";
import { CommentsCard } from "./CommentsCard";

const StyledSend = styled(Send)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Comments = ({ id, createComments, comments, updateComments }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[0].value.trim()) {
      const comment = await createComments({ message: e.target[0].value, id });
      updateComments({ card_id: id, comment_id: comment.data._id }); // missing focus from input and go to the top
      e.target[0].value = "";
    }
  };
  const reverseComments = comments?.slice()?.reverse();
  return (
    <>
      <Heading as={"h3"} semiBold mb={8}>
        Comments ({comments?.length})
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
        {comments?.length ? (
          reverseComments.map((props, index) => {
            return <CommentsCard key={index} {...props} />;
          })
        ) : (
          <h3>No comments, be the first</h3>
        )}
      </Box>
    </>
  );
};
