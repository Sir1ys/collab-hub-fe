import { createSlice } from "@reduxjs/toolkit";

type User = {
  user_id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  bio: string;
  avatar_url: string;
};

const initialState: User = {
  user_id: 0,
  username: "",
  email: "",
  password: "",
  name: "",
  bio: "",
  avatar_url: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser() {},
    removeUser() {},
  },
});
