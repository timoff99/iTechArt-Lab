import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { Flex } from "../../helpers/Flex";
import { Heading, Paragraph } from "../../helpers/Text";
import { Button } from "../Button";
import { Input } from "../Input";
import { ReactComponent as Send } from "../../../static/icons/send.svg";
import { Box } from "../../helpers/Box";
import { CommentsCard } from "./CommentsCard";
import { socket } from "../../../Socket";
import { UserContext } from "../UserProvider";

const StyledSend = styled(Send)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Comments = ({
  id,
  createComments,
  updateComments,
  comments,
  setCurrentComments,
  refreshCookbooks,
  getCookBook,
  currentCollection,
}) => {
  console.log(comments);
  const [typing, setTyping] = useState("");
  const { user } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[0].value.trim()) {
      socket.emit("comment:send", { message: e.target[0].value, parent_id: id, user_id: user._id });
      e.target[0].value = "";
    }
  };
  useEffect(() => {
    socket.emit("join:room", id);
    return () => {
      if (currentCollection) {
        refreshCookbooks(currentCollection);
      } else {
        refreshCookbooks && refreshCookbooks();
      }
      getCookBook && getCookBook(id);
      socket.emit("leave:room", id);
    };
  }, [socket]);

  useEffect(() => {
    socket.on("comment_receive", (cookBook) => {
      setCurrentComments(cookBook.comments);
    });
    return () => {
      setCurrentComments([]);
    };
  }, [socket]);

  const onTyping = () => {
    socket.emit("user:typing", user.username);
  };

  socket.on("user:typing", (typerNik) => {
    setTyping(`${typerNik} typing...`);
    setTimeout(() => {
      setTyping("");
    }, 3000);
  });

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
            onKeyDown={onTyping}
          />

          <Button size="sm" ml={5}>
            <StyledSend />
          </Button>
        </Flex>
      </form>
      <Paragraph>{typing}</Paragraph>
      <Box>
        {comments?.length ? (
          reverseComments.map((props, index) => <CommentsCard key={index} {...props} />)
        ) : (
          <Box mt={4}>
            <Paragraph fontSize={2}>No comments, be the first</Paragraph>
          </Box>
        )}
      </Box>
    </>
  );
};
