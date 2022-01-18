import styled from "styled-components";
import { Container } from "../Container";
import theme from "../../theme";
import { Box } from "../Box";

export const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 17px auto;
`;

export const User = styled(Box)`
  display: flex;
  align-items: center;
`;
