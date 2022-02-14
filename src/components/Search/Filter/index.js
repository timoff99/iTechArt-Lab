import React from "react";

import { Heading, Paragraph } from "../../../shared/helpers/Text";
import { FlexBetween, FlexColumn } from "../../../shared/helpers/Flex";
import { Slider } from "../Slider";
import { Label, Title, Wrapper, Checkbox } from "./styles";
import { Box } from "../../../shared/helpers/Box";
import { CheckboxData } from "./mockData";
import { Select } from "../../../shared/ui-kit/Select";

export const Filter = ({ label, options, value, onChange, timeRange, setTimeRange, route }) => {
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
        <Select options={options} value={value} onChange={onChange} />
      </FlexColumn>
      {route === "tab=cookbooks" && (
        <Heading as={"h3"} semiBold mb={5}>
          Cookbook type
        </Heading>
      )}
      {route === "tab=cookbooks" &&
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
