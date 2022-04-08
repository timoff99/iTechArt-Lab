import React from "react";
import styled from "styled-components";
import moment from "moment-timezone";
import { Box } from "../../../helpers/Box";
import { Flex, FlexBetween } from "../../../helpers/Flex";
import { Paragraph } from "../../../helpers/Text";

const Image = styled(Box)`
  border-radius: 50%;
  max-width: 68px;
`;

export const CommentsCard = ({ message, time, user_id }) => {
  return (
    <Flex mt={10}>
      <Image as="img" src={user_id.image} alt="person Image" />
      <Box ml={5} width={"100%"}>
        <FlexBetween>
          <Paragraph fontSize={2} semiBold>
            {user_id.username}
          </Paragraph>
          <Paragraph>{moment(time).fromNow()}</Paragraph>
        </FlexBetween>
        <Paragraph>{message}</Paragraph>
      </Box>
    </Flex>
  );
};
