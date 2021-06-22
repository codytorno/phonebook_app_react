import React from "react";

const InputFilter = ({ filterValue, onValueChange }) => {
  return (
    <div>
      filter shown with <input value={filterValue} onChange={onValueChange} />
    </div>
  );
};

export default InputFilter;
