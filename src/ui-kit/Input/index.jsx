import React from "react";
import { useState, memo } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import variants from "./inputVariants";
import theme from "../../theme";
import { Button } from "../Button";
import { ReactComponent as EyeClose } from "../../static/icons/eye-close.svg";
import smallSearch from "../../static/icons/smallSearch.svg";
import bigSearch from "../../static/icons/bigSearch.svg";
import { Box } from "../Box";

const LabelStyle = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;

  ${(props) => {
    switch (props.labelSize) {
      case "sm":
        return `margin-bottom: ${theme.space[0]};`;
      case "md":
        return `margin-bottom: ${theme.space[8]};`;
      case "lg":
        return `margin-bottom: ${theme.space[9]};`;
      default:
        return `margin-bottom: ${theme.space[8]};`;
    }
  }}
`;

const Label = styled(Box)`
  margin-bottom: ${theme.space[2]};
  margin-left: ${theme.space[1]};
  ${({ labelBold }) =>
    labelBold
      ? `font-weight: 600; font-family: ${theme.fonts.montserrat}; color: ${theme.colors.secondary.main};`
      : `font-weight: 400; font-family: ${theme.fonts.nunito}; color: ${theme.colors.secondary.light};`}
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
        padding: ${theme.space[5]} ${theme.space[9]};`;
      case "lg":
        return `background: url(${bigSearch}) ${theme.colors.background.main} no-repeat 2%;
        padding: ${theme.space[5]} 156px ${theme.space[5]} ${theme.space[10]};`;
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

export const Input = memo(
  ({
    id,
    type,
    label,
    placeholder,
    name,
    onChange,
    ClassName,
    labelBold,
    ...props
  }) => {
    const [currentType, setCurrentType] = useState(type);

    const onEyeClick = () => {
      if (currentType === "password") setCurrentType("text");
      else setCurrentType("password");
    };

    const icon =
      currentType === "password" ? (
        <EyeCloseStyle onClick={onEyeClick} />
      ) : (
        <EyeStyle onClick={onEyeClick} />
      );

    return (
      <LabelStyle {...props}>
        <Label as="label" labelBold={labelBold} htmlFor={id}>
          {label}
        </Label>
        <InputStyle
          {...props}
          as="input"
          id={id}
          type={currentType}
          name={name}
          placeholder={placeholder}
          // onChange={onChange}
        />
        {name === "Password" && <StyledSpan>Forgot password?</StyledSpan>}
        {name === "bigSearch" && <StyledButton size="md">primary</StyledButton>}
        {type === "password" && icon}
      </LabelStyle>
    );
  }
);
