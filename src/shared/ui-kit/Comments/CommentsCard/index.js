import React from "react";
import styled from "styled-components";
import moment from "moment-timezone";

import { Box } from "../../../helpers/Box";
import { Flex, FlexBetween } from "../../../helpers/Flex";
import { Paragraph } from "../../../helpers/Text";
import { mediaQueries } from "../../../../theme";

const Image = styled(Box)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageBox = styled(Flex)`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  ${mediaQueries.small} {
    width: 58px;
    height: 58px;
  }
`;

export const CommentsCard = ({ message, time, user_id }) => {
  return (
    <Flex mt={10}>
      <ImageBox>
        <Image as="img" src={user_id.image} alt="person Image" />
      </ImageBox>
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
