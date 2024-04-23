import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import Completed from "../components/Completed";

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="/succesfull" element={<Completed />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
