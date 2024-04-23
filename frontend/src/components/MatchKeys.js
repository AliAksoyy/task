import React from "react";
import ExcelColumnSelectForm from "./ExcelColumnSelectForm";

const MatchKeys = ({ matchesData,submit }) => {
  const handleUpdate = (selectedColumns) => {
   submit(selectedColumns);
  };
  return (
    <div>
      <h1>Excel Column Selection</h1>
      <ExcelColumnSelectForm
        matchesData={matchesData}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default MatchKeys;
