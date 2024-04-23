import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      {matchesData.dbKeys?.map((dbKey, index) => (
        <div key={index}>
          <label>
            {dbKey}:
            <select
              value={selectedColumns[dbKey]}
              onChange={(e) => handleSelectChange(dbKey, e.target.value)}
            >
              <option value="">Select a key</option>
              {["empty", ...matchesData.excelKeys]?.map((key, index) => (
                <option key={index} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExcelColumnSelectForm;
