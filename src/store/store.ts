import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
