import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const matchesExcel = createAsyncThunk("matchesExcel", async (formData) => {
  const res = await axios.post("http://localhost:5000/upload", formData);
  return res.data.data;
});

export { matchesExcel };
