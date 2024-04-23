import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBodyItem from "./ErrorBodyItem";
import { updateData } from "../features/uploads/uploadSlice";

const ErrorsInfo = ({ errors }) => {
  const dispatch = useDispatch();
  const [tableColumns, setTableColumns] = useState([]);

  const { excelKeys } = useSelector((state) => state.matches.matches);

  useEffect(() => {
    setTableColumns([...excelKeys,"Update"]);
  }, [excelKeys]);

  console.log(excelKeys);
  const updateTempsAndRemoveErrors = (updatedDataRow) => {
    dispatch(updateData(updatedDataRow));
  };

  if (errors?.length > 0) {
    return (
      <div style={{ padding: "2rem 1rem" }}>
        <h2 style={{ textAlign: "center", color: "red", marginBottom: "2rem" }}>
          Errors
        </h2>
        <table className="table-container">
          <thead>
            <tr>
              {tableColumns?.map((item, index) => {
                return (
                  <th key={index} className="bg-warning">
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {errors?.map((personel) => {
              return (
                <ErrorBodyItem
                  key={personel.id}
                  dataRow={personel}
                  updateTempsAndRemoveErrors={updateTempsAndRemoveErrors}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <h3 style={{ marginTop: "30px" }}>
        Excel Tablosunda Herhangi Bir Error Logu yoktur ...
      </h3>
    );
  }
};

export default ErrorsInfo;
