import React from "react";

import { Heading } from "../../../shared/helpers/Text";
import { FlexBetween, FlexColumn } from "../../../shared/helpers/Flex";
import { Slider } from "../../../shared/ui-kit/Slider";
import { Label, Title, Wrapper, Checkbox, Clear } from "./styles";
import { Box } from "../../../shared/helpers/Box";
import { CheckboxData, CheckboxDataRecipe } from "./mockData";
import { Select } from "../../../shared/ui-kit/Select";
import { useUrl } from "../../../hooks/useUrl";

export const Filter = ({ label, options, value, onChange, timeRange, setTimeRange, route }) => {
  const { query, updateQuery, clearAll } = useUrl();

  const handleTypeChange = (e) => {
    if (!e.target.checked) {
      return updateQuery(e.target.value);
    }
    return updateQuery({
      type: e.target.value,
    });
  };

  const handleSort = (e) => {
    onChange(e);
    updateQuery({
      sort: e.value,
    });
  };
  const handleCookingTime = (value) => {
    updateQuery({
      cookingRange: value,
    });
  };
  const handleClearAll = () => {
    onChange({ value: "views", label: "Views" });
    clearAll();
  };

  return (
    <Wrapper mb={5}>
      <FlexBetween mb={9}>
        <Heading as={"h3"} semiBold>
          Filter
        </Heading>
        <Clear color="primary.main" cursor="pointer" onClick={handleClearAll}>
          clear all
        </Clear>
      </FlexBetween>
      <FlexColumn as="label" htmlFor="select" mb={8}>
        {label && <Title as="span">{label}</Title>}
        <Select options={options} value={value} onChange={handleSort} />
      </FlexColumn>
      {route === "tab=cookbooks" && (
        <Heading as={"h3"} semiBold mb={5}>
          Cookbook type
        </Heading>
      )}
      {route === "tab=cookbooks" &&
        CheckboxData.map(({ value, children, mb }, index) => {
          const isChecked = (() => {
            return query.type ? query.type.includes(value) : false;
          })();

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
                    checked={isChecked}
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
            <Slider timeRange={timeRange} setTimeRange={setTimeRange} onChange={handleCookingTime} />
          </Box>
          <Heading as={"h3"} semiBold mb={5}>
            Recipe type
          </Heading>

          {CheckboxDataRecipe.map(({ value, children }, index) => {
            const isChecked = (() => {
              return query.type ? query.type.includes(value) : false;
            })();

            return (
              <Box key={index}>
                <FlexColumn>
                  <Label as="label">
                    <Checkbox
                      as="input"
                      onChange={(e) => handleTypeChange(e)}
                      type="checkbox"
                      name="fruit"
                      value={value}
                      checked={isChecked}
                    />
                    {children}
                  </Label>
                </FlexColumn>
              </Box>
            );
          })}
        </>
      )}
    </Wrapper>
  );
};
