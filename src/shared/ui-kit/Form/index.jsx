import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as Logo } from "../../../static/icons/logo.svg";
import { Box } from "../../helpers/Box";
import { Button } from "../Button";
import { Input } from "../Input";
import theme from "../../../theme";
import { Heading, Paragraph, LinkRenderer } from "../../helpers/Text";

const StyledForm = styled(Box)`
  background: ${theme.colors.background.main};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 15%);
  border-radius: 40px 10px;
  padding: 72px 56px;
  position: relative;
  z-index: 2;
`;

export const Form = ({ title, description, link, inputData, href, buttonText, ...props }) => {
  return (
    <StyledForm {...props}>
      <Logo />
      <Heading mt={8} mb={2} as={"h2"} bold>
        {title}
      </Heading>
      <Paragraph semiBold mb={9} fontSize={1}>
        {description}{" "}
        <LinkRenderer href={href} inline>
          {link}
        </LinkRenderer>
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