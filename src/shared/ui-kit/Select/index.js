import React from "react";
import ReactSelect from "react-select";
import { getCustomSelectStyle } from "./styles";

export const Select = ({ options, value, onChange }) => {
  return (
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
  );
};
