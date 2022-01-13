import React from "react";
import { useState, memo } from "react";
import styled from "styled-components";

import { Button } from "../Button";
import { ReactComponent as EyeClose } from "./eye-close.svg";
import smallSearch from "./smallSearch.svg";
import bigSearch from "./bigSearch.svg";
import { Box } from "../Box";

const LableStyle = styled.label`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    max-width: 488px;
    margin-bottom: ${theme.space[8]};
    position: relative;
  `}
`;

const LableForSmallSearchStyle = styled(LableStyle)`
  ${({ theme }) => `
    max-height: 40px;
    max-width: 284px;
    margin-bottom: ${theme.space[0]};
  `}
`;

const LableForBigSearchStyle = styled(LableStyle)`
  ${({ theme }) => `
    max-height: 70px;
    max-width: 1016px;
    margin-bottom: ${theme.space[9]};
  `}
`;

const SpanStyle = styled.span`
  ${({ theme }) => `
    margin-bottom: ${theme.space[2]};
    margin-left: ${theme.space[1]};
  `}
`;

const InputStyle = styled(Box)`
  ${({ theme }) => `
    border: 1px solid #dadada;
    border-radius: 8px;
    height: 54px;
    max-height: 54px;
    max-width: 488px;
    padding: ${theme.space[5]};
    outline: none;
  `}
`;

const InputForSmallSearchStyle = styled(InputStyle)`
  ${({ theme }) => `
    border: 0;
    border-radius: 10px;
    max-height: 40px;
    max-width: 284px;

    background: url(${smallSearch}) ${theme.colors.background2} no-repeat 5%;
    padding: ${theme.space[5]} 36px;
  `}
`;

const InputForBigSearchStyle = styled(InputStyle)`
  ${({ theme }) => `
    border: 0;
    border-radius: 10px;
    height: 70px;
    max-height: 70px;
    max-width: 1016px;

    font-family: ${theme.fonts.nunito};
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;

    background: url(${bigSearch}) ${theme.colors.backgroundMain} no-repeat 2%;
    padding: ${theme.space[5]} 56px;
    padding-right: 156px;
  `}
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
  ({ type, label, placeholder, name, onChange, ClassName }) => {
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

    if (name === "smallSearch") {
      return (
        <LableForSmallSearchStyle htmlFor="input">
          <InputForSmallSearchStyle
            as="input"
            type={currentType}
            name={name}
            // onChange={onChange}
          />
        </LableForSmallSearchStyle>
      );
    }

    if (name === "bigSearch") {
      return (
        <LableForBigSearchStyle htmlFor="input">
          <InputForBigSearchStyle
            as="input"
            type={currentType}
            name={name}
            placeholder={placeholder}
            // onChange={onChange}
          />
          <StyledButton size="md1">primary</StyledButton>
        </LableForBigSearchStyle>
      );
    }

    if (name === "Password" || "Email") {
      return (
        <LableStyle htmlFor="input">
          <SpanStyle>{label}</SpanStyle>
          <InputStyle
            as="input"
            type={currentType}
            placeholder={placeholder}
            name={name}
            // onChange={onChange}
          />
          {type === "password" && icon}
        </LableStyle>
      );
    }
  }
);
