import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  user_id: number;
  username: string;
  email: string;
  name: string;
  bio: string;
  avatar_url: string;
};

const initialState: User = {
  user_id: 0,
  username: "",
  email: "",
  name: "",
  bio: "",
  avatar_url: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state = { ...action.payload };
    },
    removeUser(state) {
      state = {
        user_id: 0,
        username: "",
        email: "",
        name: "",
        bio: "",
        avatar_url: "",
      };
    },
  },
});
