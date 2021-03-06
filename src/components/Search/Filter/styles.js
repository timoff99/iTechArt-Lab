import styled from "styled-components";

import { Box } from "../../../shared/helpers/Box";
import { Paragraph } from "../../../shared/helpers/Text";
import theme, { BORDER_RADIUS } from "../../../theme";

export const Label = styled(Box)``;

export const Title = styled(Box)`
  margin-bottom: 5px;
`;

export const Wrapper = styled(Box)`
  background: ${theme.colors.background.main};

  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
  border-radius: ${BORDER_RADIUS}px;
  padding: 32px 24px;
`;

export const Checkbox = styled(Box)`
  margin-right: 8px;
`;

export const Clear = styled(Paragraph)`
  cursor: pointer;
  color: ${theme.colors.primary.main};
`;
