import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import { Box } from "../../helpers/Box";
import variants from "./buttonVariants";
import { Loader } from "../Loader";
import { memo } from "react";

const StyledButton = styled(Box)`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  align-items: center;
  text-align: center;
  justify-content: center;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  text-decoration: none !important;
  position: relative;
  ${(props) =>
    props.loading &&
    `span {
  color: transparent;
  cursor: default;
  position:relative;
    }
`}

  :active {
    span {
      transform: translateY(1px);
    }
  }
  ${({ disabled }) => `
    cursor: ${disabled ? "normal" : "pointer"};
  `}
  ${({ disabled }) => {
    return variant({
      variants: variants(disabled),
    });
  }}

  :hover {
    ${() => {
      return variant({
        prop: "variantMenu",
        variants: variants(),
      });
    }}
  }

  ${(props) => {
    switch (props.size) {
      case "box":
        return `padding: ${props.theme.space[2]} ${props.theme.space[5]};`;
      case "sm":
        return `padding: ${props.theme.space[2]} ${props.theme.space[9]};`;
      case "md":
        return `padding: ${props.theme.space[3]} ${props.theme.space[9]};`;
      case "fit":
        return `width: 100%; 
        padding: ${props.theme.space[3]} 0;`;
      case "lg":
        return `padding: ${props.theme.space[5]} ${props.theme.space[9]};`;
      case "link":
        return `padding: 0;`;
      default:
        return `padding: ${props.theme.space[3]} ${props.theme.space[9]};`;
    }
  }}
`;

export const Button = memo(({ children, ...props }) => (
  <StyledButton {...props}>
    {
      <>
        {props.loading ? (
          <Box position="absolute" top="26%" left="42%">
            <Loader />
          </Box>
        ) : null}
        <span>{children}</span>
      </>
    }
  </StyledButton>
));

Button.defaultProps = {
  as: "button",
  variant: "primary",
};
