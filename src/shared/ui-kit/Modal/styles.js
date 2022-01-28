import styled from "styled-components";

import { Box } from "../../helpers/Box";
import { ReactComponent as X } from "../../../static/icons/x.svg";
import theme from "../../../theme";

export const Overlay = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(24, 24, 24, 0.5);
`;

export const StyledX = styled(X)`
  position: absolute;
  top: 25px;
  left: 50%;
  z-index: 100;
  cursor: pointer;
`;

export const Content = styled(Box)`
  position: absolute;
  top: 100px;
  left: 190px;
  right: 190px;
  bottom: 0px;
  border: 1px solid #ccc;
  background: ${theme.colors.background.main};
  overflow: auto;
  border-radius: 4px;
  box-shadow: 0px 18px 60px rgba(24, 24, 24, 0.7);
  outline: none;
`;
