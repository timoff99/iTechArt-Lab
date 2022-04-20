import styled from "styled-components";

import { Box } from "../../helpers/Box";
import { BORDER_RADIUS } from "../../../theme";
import theme from "../../../theme";

export const StyledCard = styled(Box)`
  display: flex;
  flex: 1;
  background: ${theme.colors.background.main};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
  border-radius: ${BORDER_RADIUS}px;
  transition: all 0.4s;

  &:hover {
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.24);
    cursor: pointer;
    transition: all 0.4s;
  }
`;

export const ImgBox = styled(Box)`
  ${({ image }) => `background: url(${image})`};
  background-size: cover;
  width: 240px;
  height: 240px;
  border-radius: 50px 10px;
  flex: 1 0 auto;
`;

export const OptionMenu = styled(Box)`
  padding: 8px;
  position: absolute;
  top: 20px;
  right: -50px;
  box-shadow: 0px 0px 8px 4px ${theme.colors.background.dark};
  transition: all 0.2s;
  background: ${theme.colors.background.main};
  border-radius: 10px;
`;
