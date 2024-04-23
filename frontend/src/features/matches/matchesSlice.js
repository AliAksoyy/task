import { createSlice } from "@reduxjs/toolkit";
import { matchesExcel } from "./asyncAction";
import { toastifyError } from "../../helpers/toastify";

const initialState = {
  loading: false,
  matches: { fileName: null, excelKeys: [], dbKeys: [] },
};

const matchesSlice = createSlice({
  name: "matchesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(matchesExcel.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(matchesExcel.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.matches = {
          fileName: payload.fileName,
          excelKeys: payload.excelKeys,
          dbKeys: payload.dbKeys,
        };
      })
      .addCase(matchesExcel.rejected, (state, { error }) => {
        state.loading = false;
        toastifyError(error.message);
      });
  },
});

// export const {} = matchesSlice.actions;
export default matchesSlice.reducer;
