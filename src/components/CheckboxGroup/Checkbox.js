import React from "react";

const Checkbox = ({ label, value, checked, onChange }) => (
  <label>
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChange}
    />
    {label}
  </label>
);

export default Checkbox;
