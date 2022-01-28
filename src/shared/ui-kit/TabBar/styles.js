import styled from "styled-components";

import theme from "../../../theme";
import { Box } from "../../helpers/Box";
export const Wrapper = styled(Box)`
  display: flex;
`;

export const Tab = styled.button`
  margin-right: 26px;
  padding: 12px;
  border: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  background: transparent;
  z-index: 10;

  color: ${theme.colors.secondary.main};

  transition: all 0.2s;
`;

export const ActiveTab = styled(Tab)`
  box-shadow: inset 0 -2px 0 0 ${theme.colors.primary.main};
`;
