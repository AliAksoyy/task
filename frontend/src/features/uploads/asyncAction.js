import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uploadExcel = createAsyncThunk(
  "uploadExcel",
  async ({ matches, fileName }) => {
    const res = await axios.post("http://localhost:5000/upload/test", {
      matches,
      fileName,
    });

    return res.data.data;
  }
);

export { uploadExcel };
