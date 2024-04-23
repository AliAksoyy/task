import React from "react";
import { useDispatch } from "react-redux";
import ErrorBodyItem from "./ErrorBodyItem";
import { updateData } from "../features/uploads/uploadSlice";

const ErrorsInfo = ({ errors }) => {
  const dispatch = useDispatch();

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
              <th className="bg-warning">Personel name</th>
              <th className="bg-warning">Personel surname</th>
              <th className="bg-warning">Net Salary</th>
              <th className="bg-warning">Age</th>
              <th className="bg-warning">Blood Type</th>
              <th className="bg-warning">Update</th>
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
