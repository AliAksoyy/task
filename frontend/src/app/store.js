import { configureStore } from "@reduxjs/toolkit";
import uploadSlice from "../features/uploads/uploadSlice";
import matchesSlice from "../features/matches/matchesSlice";

export const store = configureStore({
  reducer: {
    upload: uploadSlice,
    matches: matchesSlice,
  },
});
