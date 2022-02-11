import React from "react";
import ReactSelect from "react-select";

import { getCustomSelectStyle } from "./styles";

export const MultiSelect = ({ options, value, onChange, placeholder }) => {
  return (
    <ReactSelect
      name="select"
      classNamePrefix="select"
      blurInputOnSelect={false}
      hideSelectedOptions={false}
      styles={getCustomSelectStyle()}
      isFocused={false}
      options={options}
      closeMenuOnSelect={false}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isMulti
      isClearable={false}
      isSearchable
    />
  );
};
