import { createSlice } from "@reduxjs/toolkit";
import { uploadExcel } from "./asyncAction";
import { toastifyError } from "../../helpers/toastify";

const initialState = {
  loading: false,
  uploadData: { errors: [], temps: [] },
};

const uploadSlice = createSlice({
  name: "uploadSlice",
  initialState,
  reducers: {
    updateData: (state, { payload }) => {
      state.uploadData = {
        errors: state.uploadData.errors.filter((error) => {
          return error.id !== payload.id;
        }),
        temps: [
          {
            id: payload.id,
            firstName: payload.personelName,
            lastName: payload.personelSurname,
            age: payload.age,
            salaryAmount: payload.netSalary,
            bloodType: payload.bloodType,
            salaryType: "TL",
            annualLeaveLimit: 15,
            emailAddress: null, // default,
          },
          ...state.uploadData.temps,
        ],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadExcel.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(uploadExcel.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.uploadData = {
          errors: payload.errors?.map((err) => ({
            id: Math.random().toString().split(".")[1],
            ...err,
          })),
          temps: payload.temps,
        };
      })
      .addCase(uploadExcel.rejected, (state, { error }) => {
        state.loading = false;
        toastifyError(error.message);
      });
  },
});

export const { updateData } = uploadSlice.actions;
export default uploadSlice.reducer;
