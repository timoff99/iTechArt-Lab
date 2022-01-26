import React, { forwardRef } from "react";
import styled from "styled-components";
import ReactSelect from "react-select";

import { Box } from "../../helpers/Box";

const Label = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled(Box)`
  margin-bottom: 5px;
`;

const getCustomStyle = () => ({
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#f5f5f7" : state.isSelected ? "#CBCDE433" : "var(--white)",
    color: state.isSelected ? "var(--blue)" : "var(--black)",
    backgroundImage: state.isSelected
      ? "url(\"data:image/svg+xml,%3Csvg width='14' height='10' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.7763 0.501775C13.0514 0.746387 13.0762 1.16777 12.8316 1.44296L5.7205 9.44296C5.59399 9.58528 5.41265 9.66671 5.22223 9.66671C5.0318 9.66671 4.85047 9.58528 4.72396 9.44296L1.1684 5.44296C0.923789 5.16777 0.948576 4.74639 1.22376 4.50177C1.49895 4.25716 1.92033 4.28195 2.16495 4.55714L5.22223 7.99658L11.8351 0.557139C12.0797 0.28195 12.5011 0.257163 12.7763 0.501775Z' fill='%232F37A6' stroke='%232F37A6' stroke-width='0.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A\");"
      : null,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top 50% right 16px",
    fontSize: "16px",
    cursor: "pointer",
    ":active": { backgroundColor: state.isSelected ? null : null },
    ":hover": { backgroundColor: "#CBCDE433" },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "2px",
    fontWeight: "400",
    border: "1px solid var(--light-blue)",
    borderRadius: "6px",
    boxShadow: "none",
    overflow: "hidden",
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "1px solid var(--blue) !important" : "1px solid var(--light-blue)",
    borderRadius: "6px",
    fontWeight: "400",
    boxShadow: "none",
    height: "48px",
    fontSize: "16px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    paddingLeft: " 14px",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: "0",
    color: "var(--grey)",
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen && "rotate(180deg)",
    ":hover": { color: "var(--grey)" },
  }),
  indicatorSeparator: () => ({}),
  indicatorsContainer: (provided) => ({
    ...provided,
    width: "38px",
    justifyContent: "center",
  }),
});

export const Filter = ({ label, options, value, onChange }) => {
  return (
    <Label as="label" htmlFor="select">
      {label && <Title as="span">{label}</Title>}
      <ReactSelect
        name="select"
        blurInputOnSelect
        classNamePrefix="select"
        hideSelectedOptions={false}
        styles={getCustomStyle()}
        isFocused={false}
        options={options}
        value={value}
        onChange={onChange}
      />
    </Label>
  );
};
