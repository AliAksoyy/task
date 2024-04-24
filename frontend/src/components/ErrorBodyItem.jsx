import React, { useState } from "react";
import ErrorsInfoTableData from "./ErrorsInfoTableData";
import { toastifyWarning } from "../helpers/toastify";

const ErrorBodyItem = ({
  dataRow,
  updateTempsAndRemoveErrors,
  excelOriginalKeys,
}) => {
  const [updatedDataRow, setUpdatedDataRow] = useState(dataRow);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "C" || name === "D") {
      isNaN(value) && toastifyWarning("Lütfen Number Değer Giriiniz");
    }

    const updatedData = {
      ...updatedDataRow,
      [name]: name === "D" || name === "C" ? Number(value) : value,
    };
    setUpdatedDataRow(updatedData);
  };

  const updateErrorExcel = () => {
    if (
      excelOriginalKeys.some(
        (key) => typeof updatedDataRow[key] === "undefined"
      ) ||
      typeof updatedDataRow.C !== "number" ||
      typeof updatedDataRow.D !== "number"
    ) {
      toastifyWarning("Değerleriniz hatalı, Lütfen düzgün değer giriniz");
      return;
    }

    updateTempsAndRemoveErrors(updatedDataRow);
  };
  return (
    <tr>
      {excelOriginalKeys?.map((item, index) => {
        return (
          <ErrorsInfoTableData
            key={index}
            handleChange={handleChange}
            value={
              item === "E" && updatedDataRow[item] === 0
                ? "0"
                : updatedDataRow[item]
            }
            name={[item]}
            errorClass={
              item === "E" && updatedDataRow[item] === 0
                ? "bg-success"
                : (item !== "D" || item !== "C") && !updatedDataRow[item]
                ? "bg-danger"
                : item === "D" && typeof updatedDataRow[item] != "number"
                ? "bg-danger"
                : item === "C" && typeof updatedDataRow[item] != "number"
                ? "bg-danger"
                : "bg-success"
            }
          />
        );
      })}

      {/* <ErrorsInfoTableData
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
        value={
          updatedDataRow?.bloodType === 0 ? "0" : updatedDataRow?.bloodType
        }
        errorClass={
          updatedDataRow.bloodType === undefined ||
          updatedDataRow.bloodType === ""
            ? "bg-danger"
            : "bg-success"
        }
      /> */}

      <td className="bg-primary">
        <div onClick={updateErrorExcel} className="errorUpdate">
          Update
        </div>
      </td>
    </tr>
  );
};

export default ErrorBodyItem;
