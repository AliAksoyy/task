import React from "react";
import ExcelColumnSelectForm from "./ExcelColumnSelectForm";

const MatchKeys = ({ matchesData, submit }) => {
  const handleUpdate = (selectedColumns) => {
    submit(selectedColumns);
  };
  return (
    <div
      style={{
        padding: "3rem",
        textAlign: "center",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
      }}
    >
      <h1
        style={{
          borderBottom: "2px solid #333",
          paddingBottom: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        Excel Column Selection
      </h1>
      <ExcelColumnSelectForm
        matchesData={matchesData}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default MatchKeys;
