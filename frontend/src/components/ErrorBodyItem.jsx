import React, { useState } from "react";
import ErrorsInfoTableData from "./ErrorsInfoTableData";
import { toastifyWarning } from "../helpers/toastify";

const ErrorBodyItem = ({ dataRow, updateTempsAndRemoveErrors }) => {
  const [updatedDataRow, setUpdatedDataRow] = useState(dataRow);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...updatedDataRow,
      [name]: name === "age" || name === "netSalary" ? Number(value) : value,
    };
    setUpdatedDataRow(updatedData);
  };

  const updateErrorExcel = () => {
    if (
      typeof updatedDataRow.personelName === "undefined" ||
      typeof updatedDataRow.personelSurname === "undefined" ||
      typeof updatedDataRow.bloodType === "undefined" ||
      typeof updatedDataRow.age !== "number" ||
      typeof updatedDataRow.netSalary !== "number"
    ) {
      toastifyWarning("Değerleriniz hatalı, Lütfen düzgün değer giriniz");
      return;
    }

    updateTempsAndRemoveErrors(updatedDataRow);
  };
  return (
    <tr>
      <ErrorsInfoTableData
        handleChange={handleChange}
        value={updatedDataRow?.personelName}
        name={"personelName"}
        errorClass={
          !updatedDataRow?.personelName?.trim() ? "bg-danger" : "bg-success"
        }
      />
      <ErrorsInfoTableData
        handleChange={handleChange}
        name={"personelSurname"}
        value={updatedDataRow?.personelSurname}
        errorClass={
          !updatedDataRow?.personelSurname?.trim() ? "bg-danger" : "bg-success"
        }
      />
      <ErrorsInfoTableData
        handleChange={handleChange}
        name={"netSalary"}
        value={updatedDataRow?.netSalary}
        errorClass={
          isNaN(updatedDataRow?.netSalary) ? "bg-danger" : "bg-success"
        }
      />
      <ErrorsInfoTableData
        handleChange={handleChange}
        name={"age"}
        value={updatedDataRow?.age}
        errorClass={isNaN(updatedDataRow?.age) ? "bg-danger" : "bg-success"}
      />
      <ErrorsInfoTableData
        handleChange={handleChange}
        name={"bloodType"}
        value={updatedDataRow?.bloodType === 0 ? "0" : updatedDataRow?.bloodType}
        errorClass={
          updatedDataRow.bloodType === undefined ||
          updatedDataRow.bloodType === ""
            ? "bg-danger"
            : "bg-success"
        }
      />
      
      <td className="bg-primary">
        <div onClick={updateErrorExcel} className="errorUpdate">
          Update
        </div>
      </td>
    </tr>
  );
};

export default ErrorBodyItem;
