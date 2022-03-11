import styled from "styled-components";

import { Box } from "../../../shared/helpers/Box";
import theme, { mediaQueries } from "../../../theme";
import { Button } from "../../../shared/ui-kit/Button";
import { Flex } from "../../../shared/helpers/Flex";

export const StyledButton = styled(Button)`
  &:hover {
    background: ${theme.colors.primary.main};
  }
  ${mediaQueries.medium} {
    padding: ${theme.space[2]} ${theme.space[3]};
  }
  ${mediaQueries.large} {
    padding: ${theme.space[3]} ${theme.space[9]};
  }
`;

export const RelativeCard = styled(Box)`
  position: relative;
  padding-top: ${(540 / 600) * 100}%;
  border-radius: 50px 10px;
  ${({ bg }) => {
    return `background: url(${bg}) no-repeat center center / cover;`;
  }}
  ${({ pt }) => {
    return `padding-top: ${pt};`;
  }}
  margin-bottom: 24px;
  > ${Box} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const BoxGradient = styled(Flex)`
  background: linear-gradient(180deg, #1b1c20 0%, rgba(27, 28, 32, 0) 100%);
  border-radius: 50px 10px;
`;

export const StyledOptions = styled(Box)`
  margin-top: 10px;
  margin-right: ${theme.space[8]};
  align-self: flex-start;
  margin-left: auto;
`;

export const OptionMenu = styled(Box)`
  padding: 8px;
  position: absolute;
  right: 10px;
  box-shadow: 0px 0px 8px 4px ${theme.colors.background.dark};
  transition: all 0.2s;
  background: ${theme.colors.background.main};
  border-radius: 10px;
`;
