import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },

  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state, action) => {
      state.user = {};
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
