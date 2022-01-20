import styled from "styled-components";
import { Box } from "../Box";

export const Flex = styled(Box)`
  display: flex;
`;

export const FlexAlignCenter = styled(Flex)`
  align-items: center;
`;
export const FlexBetween = styled(Flex)`
  justify-content: space-between;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexCenter = styled(Flex)`
  align-items: center;
  justify-content: center;
`;
