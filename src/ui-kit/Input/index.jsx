import React from "react";
import { useState, memo } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import variants from "./inputVariants";
import theme from "../../theme";
import { Button } from "../Button";
import { ReactComponent as EyeClose } from "./eye-close.svg";
import smallSearch from "./smallSearch.svg";
import bigSearch from "./bigSearch.svg";
import { Box } from "../Box";

const LableStyle = styled.label`
  display: flex;
  flex-direction: column;
  max-width: 488px;
  position: relative;

  ${() => {
    return variant({
      prop: "variantLable",
      variants: variants(),
    });
  }}

  ${(props) => {
    switch (props.lableSize) {
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

const SpanStyle = styled.span`
  margin-bottom: ${theme.space[2]};
  margin-left: ${theme.space[1]};
`;

const InputStyle = styled(Box)`
  border: 1px solid ${theme.colors.background.contrast};
  border-radius: 8px;
  height: 54px;
  max-height: 54px;
  max-width: 488px;
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
        return `background: url(${smallSearch}) ${theme.colors.light} no-repeat 5%;
        padding: ${theme.space[5]} ${theme.space[9]};`;
      case "md":
        return ``;
      case "lg":
        return `background: url(${bigSearch}) ${theme.colors.background.main} no-repeat 2%;
        padding: ${theme.space[5]} ${theme.space[10]};`;
      default:
        return ``;
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
  right: 10px;
  top: 12px;
`;

export const Input = memo(
  ({ type, label, placeholder, name, onChange, ClassName, ...props }) => {
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
      <LableStyle htmlFor="input" {...props}>
        <InputStyle
          {...props}
          as="input"
          type={currentType}
          name={name}
          placeholder={placeholder}
          // onChange={onChange}
        />
        {name === "bigSearch" && (
          <StyledButton size="md1">primary</StyledButton>
        )}
        {type === "password" && icon}
      </LableStyle>
    );
  }
);

Input.defaultProps = {
  variant: "smallLabel",
};
