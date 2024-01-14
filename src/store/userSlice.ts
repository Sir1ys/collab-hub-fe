import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type User } from "../types/types";

const initialState: User = {
  user_id: 0,
  username: "",
  email: "",
  name: "",
  bio: "",
  avatar_url: "",
  github_url: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return (state = { ...action.payload });
    },
    removeUser(state) {
      return (state = {
        user_id: 0,
        username: "",
        email: "",
        name: "",
        bio: "",
        avatar_url: "",
        github_url: "",
      });
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
