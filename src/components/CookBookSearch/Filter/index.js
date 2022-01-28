import React from "react";
import ReactSelect from "react-select";

import { Heading, Paragraph } from "../../../shared/helpers/Text";
import { FlexBetween, FlexColumn } from "../../../shared/helpers/Flex";
import { Slider } from "../Slider";
import { getCustomSelectStyle, Label, Title, Wrapper, Checkbox } from "./styles";
import { Box } from "../../../shared/helpers/Box";

export const Filter = ({ label, options, value, onChange, timeRange, setTimeRange }) => {
  const route = "tab=recipes";
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
        <>
          <Heading as={"h3"} semiBold mb={5}>
            Cookbook type
          </Heading>
          <FlexColumn>
            <Label as="label">
              <Checkbox
                as="input"
                onChange={(e) => handleTypeChange(e)}
                type="checkbox"
                name="fruit"
                value="vegetarian"
              />
              Vegetarian
            </Label>
            <Label as="label">
              <Checkbox
                as="input"
                onChange={(e) => handleTypeChange(e)}
                type="checkbox"
                name="fruit"
                value="without-milk"
              />
              Without Milk
            </Label>
            <Label as="label" mb={8}>
              <Checkbox
                as="input"
                onChange={(e) => handleTypeChange(e)}
                type="checkbox"
                name="fruit"
                value="without-eggs"
              />
              Without Eggs
            </Label>
            <Label as="label">
              <Checkbox
                as="input"
                onChange={(e) => handleTypeChange(e)}
                type="checkbox"
                name="fruit"
                value="hide-my-cookbooks"
              />
              Hide My CookBooks
            </Label>
          </FlexColumn>{" "}
        </>
      )}
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
