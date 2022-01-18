import styled from "styled-components";
import {Container} from "../Container";
import theme from "../../theme";
import {Box} from "../Box";

export const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 17px auto;
`;

export const Ul = styled.ul`
  display: flex;
  list-style-type: none;

  color: ${theme.colors.secondary.main};
	li {
    margin-right: 72px;
    &:last-child {
      margin-right: 0px;
    }
	}
`;

export const User = styled(Box)`
  display: flex;
  align-items: center;
`;
