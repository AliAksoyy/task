import React from "react";

const ErrorsInfoTableDataCell = ({ handleChange, value, name, errorClass }) => {
  return (
    <td className={errorClass}>
      <input
        className={`input`}
        onChange={handleChange}
        name={name}
        value={value || ""}
      />
    </td>
  );
};

export default ErrorsInfoTableDataCell;
