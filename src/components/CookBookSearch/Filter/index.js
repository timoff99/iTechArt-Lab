import React from "react";
import ReactSelect from "react-select";

import { Heading, Paragraph } from "../../../shared/helpers/Text";
import { FlexBetween, FlexColumn } from "../../../shared/helpers/Flex";
import { Slider } from "../Slider";
import { getCustomSelectStyle, Label, Title, Wrapper, Checkbox } from "./styles";
import { Box } from "../../../shared/helpers/Box";
import { CheckboxData } from "./mockData";

export const Filter = ({ label, options, value, onChange, timeRange, setTimeRange }) => {
  const route = "tab=cookbook";
  const handleTypeChange = (e) => {
    if (e.target.checked) {
      console.log(e.target.value);
    }
  };
  return (
    <Wrapper>
      <FlexBetween mb={9}>
        <Heading as={"h3"} semiBold>
          Filter
        </Heading>
        <Paragraph color="primary.main">clear all</Paragraph>
      </FlexBetween>
      <FlexColumn as="label" htmlFor="select" mb={8}>
        {label && <Title as="span">{label}</Title>}
        <ReactSelect
          name="select"
          blurInputOnSelect
          classNamePrefix="select"
          hideSelectedOptions={false}
          styles={getCustomSelectStyle()}
          isFocused={false}
          options={options}
          value={value}
          onChange={onChange}
        />
      </FlexColumn>
      {route === "tab=cookbook" && (
        <Heading as={"h3"} semiBold mb={5}>
          Cookbook type
        </Heading>
      )}
      {route === "tab=cookbook" &&
        CheckboxData.map(({ value, children, mb }, index) => {
          return (
            <Box key={index}>
              <FlexColumn>
                <Label as="label" mb={mb}>
                  <Checkbox
                    as="input"
                    onChange={(e) => handleTypeChange(e)}
                    type="checkbox"
                    name="fruit"
                    value={value}
                  />
                  {children}
                </Label>
              </FlexColumn>
            </Box>
          );
        })}
      {route === "tab=recipes" && (
        <>
          <Heading as={"h3"} semiBold mb={5}>
            Cooking Time
          </Heading>
          <Box mb={9}>
            <Slider timeRange={timeRange} setTimeRange={setTimeRange} />
          </Box>
        </>
      )}
    </Wrapper>
  );
};
