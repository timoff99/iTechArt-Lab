import React from "react";
import styled from "styled-components";

import { Box } from "../../helpers/Box";
import theme from "../../../theme";

const LabelStyle = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${theme.space[9]};
`;

const Label = styled(Box)`
  ${({ label }) =>
    label
      ? `margin-bottom: ${theme.space[2]}; margin-left: ${theme.space[1]};`
      : `margin-bottom: ${theme.space[0]}; margin-left: ${theme.space[0]};`};

  ${({ labelBold }) =>
    labelBold
      ? `font-weight: 600; font-family: ${theme.fonts.header}; color: ${theme.colors.secondary.main};`
      : `font-weight: 400; font-family: ${theme.fonts.paragraph}; color: ${theme.colors.secondary.light};`}
`;

const TextareaStyle = styled(Box)`
  border: 1px solid ${theme.colors.background.contrast};
  border-radius: 8px;
  height: 140px;
  padding: ${theme.space[5]};
  outline: none;
`;

export const Textarea = ({ id, label, placeholder, labelBold, name }) => {
  return (
    <LabelStyle>
      <Label as="label" label={label} labelBold={labelBold} htmlFor={id}>
        {label}
      </Label>
      <TextareaStyle as="textarea" id={id} name={name} placeholder={placeholder} />
    </LabelStyle>
  );
};
