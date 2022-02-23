import React from "react";
import styled from "styled-components";
import { border, color, flexbox, layout, space, typography, position } from "styled-system";
import { Link } from "react-router-dom";

import { FontConfigurations } from "../../../theme/typography";

export const Text = styled("span")`
  ${typography}
  ${space}
  ${layout}
  ${color}
  ${border}
  ${flexbox}
  ${position}
  
  ${(props) => props.bold && "font-weight: bold"};
  ${(props) => props.semiBold && "font-weight: 600"};
  ${(props) => (props.underline ? "text-decoration: underline;" : "")};
  ${(props) => (props.uppercase ? "text-transform: uppercase;" : "")};
  ${(props) => (props.noWrap ? "white-space: nowrap" : "")};
  ${(props) => (props.capitalize ? "text-transform: capitalize;" : "")};
  ${(props) => (props.inline ? "display: inline-block;" : "display: block")};
`;

export const Heading = ({ children, as, ...props }) => {
  return (
    <Text as={as} {...FontConfigurations[as]} {...props}>
      {children}
    </Text>
  );
};

export const Paragraph = ({ children, as = "p", ...props }) => {
  const { p } = FontConfigurations;

  return (
    <Text as={as} {...p} {...props}>
      {children}
    </Text>
  );
};

export const LinkRenderer = ({ children, href, as = "span", ...props }) => {
  const { link } = FontConfigurations;

  return (
    <Link to={href}>
      <Text as={as} {...link} {...props}>
        {children}
      </Text>
    </Link>
  );
};
