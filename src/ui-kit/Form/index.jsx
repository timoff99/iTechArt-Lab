import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as Logo } from "../../static/icons/logo.svg";
import { Box } from "../Box";
import { Button } from "../Button";
import { Input } from "../Input";
import theme from "../../theme";
import {Heading, Paragraph} from "../Text";

const StyledForm = styled(Box)`
  background: ${theme.colors.background.main};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 15%);
  border-radius: 40px 10px;
  padding: 72px 56px;
  position: relative;
  z-index: 2;
`;

const Span = styled(P)`
  color: ${theme.colors.primary.main};
  cursor: pointer;
`;
export const Form = ({ title, description, link, inputData, buttonText, ...props }) => {
  return (
    <StyledForm {...props}>
      <Logo />
      <Heading mt={8} mb={2} as={'h3'}>{title}</Heading>
      <Paragraph semiBold mb={9}>
        {description} <Span as="span">{link}</Span>
      </Paragraph>
      {inputData.map((data, index) => {
        return <Input key={index} {...data} />;
      })}

      <Button size="fit" mt="14px">
        {buttonText}
      </Button>
    </StyledForm>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  inputData: PropTypes.array,
  buttonText: PropTypes.string,
};
