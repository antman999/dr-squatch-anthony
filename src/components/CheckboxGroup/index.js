import React from "react";
import "./checkbox.css";
import Checkbox from "./Checkbox";

const CheckboxGroup = ({ options, values, onChange }) => (
  <div className="checkbox">
    {options &&
      options.map((option) => (
        <Checkbox
          key={option.value}
          label={option.label}
          value={option.value}
          checked={values.includes(option.value)}
          onChange={onChange}
        />
      ))}
  </div>
);

export default CheckboxGroup;
