import React from "react";
import { useState, memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { variant } from "styled-system";

import variants from "./inputVariants";
import theme from "../../theme";
import { Button } from "../Button";
import { ReactComponent as EyeClose } from "../../static/icons/eye-close.svg";
import smallSearch from "../../static/icons/smallSearch.svg";
import bigSearch from "../../static/icons/bigSearch.svg";
import { Box } from "../Box";
import { LinkRenderer } from "../Text";

const LabelStyle = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;

  ${(props) => {
    switch (props.labelSize) {
      case "sm":
        return `margin-bottom: ${theme.space[0]};`;
      case "md":
        return `margin-bottom: ${theme.space[9]};`;
      case "lg":
        return `margin-bottom: ${theme.space[10]};`;
      default:
        return `margin-bottom: ${theme.space[9]};`;
    }
  }}
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

const InputStyle = styled(Box)`
  border: 1px solid ${theme.colors.background.contrast};
  border-radius: 8px;
  height: 54px;
  padding: ${theme.space[5]};
  outline: none;

  ${() => {
    return variant({
      prop: "variantInput",
      variants: variants(),
    });
  }}

  ${(props) => {
    switch (props.inputSize) {
      case "sm":
        return `background: url(${smallSearch}) ${theme.colors.background.light} no-repeat 5%;
        padding: ${theme.space[5]} ${theme.space[10]};`;
      case "lg":
        return `background: url(${bigSearch}) ${theme.colors.background.main} no-repeat 2%;
        padding: ${theme.space[5]} 156px ${theme.space[5]} ${theme.space[11]};`;
    }
  }}
`;

const EyeCloseStyle = styled(EyeClose)`
  display: block;
  position: absolute;
  right: 16px;
  bottom: 14px;
  cursor: pointer;
`;

const EyeStyle = styled(EyeCloseStyle)`
  opacity: 0.6;
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translate(0, -45%);
`;

const StyledSpan = styled(Box)`
  font-weight: 600;
  color: ${theme.colors.primary.main};
  cursor: pointer;
  position: absolute;
  right: 0;
`;

export const Input = memo(({ id, type, label, placeholder, name, labelBold, labelSize, ...props }) => {
  const [currentType, setCurrentType] = useState(type);
  const onEyeClick = () => {
    if (currentType === "password") setCurrentType("text");
    else setCurrentType("password");
  };

  const icon = currentType === "password" ? <EyeCloseStyle onClick={onEyeClick} /> : <EyeStyle onClick={onEyeClick} />;

  return (
    <LabelStyle labelSize={labelSize}>
      <Label as="label" label={label} labelBold={labelBold} htmlFor={id}>
        {label}
      </Label>
      <InputStyle {...props} as="input" id={id} type={currentType} name={name} placeholder={placeholder} />
      {name === "Password" && (
        <LinkRenderer href="/" semiBold position="absolute" top="0" right="0">
          Forgot password?
        </LinkRenderer>
      )}
      {name === "bigSearch" && <StyledButton size="md">primary</StyledButton>}
      {type === "password" && icon}
    </LabelStyle>
  );
});

Input.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  labelBold: PropTypes.string,
};
