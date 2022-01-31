import React from "react";
import styled from "styled-components";

import { Box } from "../../../helpers/Box";
import { Flex, FlexBetween } from "../../../helpers/Flex";
import { Paragraph } from "../../../helpers/Text";

const Image = styled(Box)`
  object-fit: contain;
  min-width: auto;
`;

export const CommentsCard = ({ name, comment, time, image }) => {
  return (
    <Flex mt={10}>
      <Image as="img" src={image} alt="person Image" />
      <Box ml={5}>
        <FlexBetween>
          <Paragraph fontSize={2} semiBold>
            {name}
          </Paragraph>
          <Paragraph>{time}</Paragraph>
        </FlexBetween>
        <Paragraph>{comment}</Paragraph>
      </Box>
    </Flex>
  );
};
