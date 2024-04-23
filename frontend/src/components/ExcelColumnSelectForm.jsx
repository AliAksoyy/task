import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const ExcelColumnSelectForm = ({ matchesData, onUpdate }) => {
  const [selectedColumns, setSelectedColumns] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(selectedColumns);
  };

  const handleSelectChange = (dbKey, selectedKey) => {
    setSelectedColumns((prevSelectedColumns) => ({
      ...prevSelectedColumns,
      [dbKey]: selectedKey,
    }));
  };

  return (
    <form style={{}} onSubmit={handleSubmit}>
      {matchesData.dbKeys?.map((dbKey, index) => (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "1rem",
            minWidth: "300px",
          }}
          key={index}
        >
          <label>{dbKey}</label>
          <Form.Select
            style={{ width: "50%", fontSize: "1.5rem !important" }}
            value={selectedColumns[dbKey]}
            onChange={(e) => handleSelectChange(dbKey, e.target.value)}
          >
            <option value="">Select a key</option>
            {["Default", ...matchesData.excelKeys]?.map((key, index) => (
              <option key={index} value={key}>
                {key}
              </option>
            ))}
          </Form.Select>
        </div>
      ))}
      <button style={{ marginTop: "1.5rem" }} type="submit">
        Submit
      </button>
    </form>
  );
};

export default ExcelColumnSelectForm;
