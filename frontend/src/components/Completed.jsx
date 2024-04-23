import React from "react";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h2>Kaydetme başarılı bir şekilde bitmiştir</h2>
      <button onClick={handleClick}> Geri</button>
    </div>
  );
};
export default Completed;
