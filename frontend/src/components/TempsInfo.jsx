import React from "react";
import ReactJson from "react-json-view";
import axios from "axios";
import { confirm } from "../util/confirm";
import { useNavigate } from "react-router-dom";

const TempsInfo = ({ src, setTemps }) => {
  const navigate = useNavigate();

  const handleSave = async () => {
    const userConfirmed = await confirm(
      "Customer Data Our DataBase Kaydetmek İstediğinize Emin misiniz?"
    );
    if (userConfirmed) {
      try {
        console.log(src);
        await axios.post("http://localhost:5000/save", src);
        navigate("/succesfull");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = ({ updated_src }) => {
    setTemps(updated_src);
  };

  return (
    <>
      <h2 style={{ textAlign: "center", color: "#0056b3" }}>Template</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <ReactJson
          src={src}
          name="temps"
          displayDataTypes={false}
          onEdit={(edit) => handleEdit(edit)}
        />
        <button
          style={{ position: "sticky", top: "40px", zIndex: "999" }}
          onClick={handleSave}
        >
          Kaydet
        </button>
      </div>
    </>
  );
};

export default TempsInfo;
