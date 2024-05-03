import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.username = action.payload;
    },
    addUserEmail: (state, action) => {
      state.email = action.payload;
    }
  },
});
export const {
  addUser,
  addUserEmail,
} = userSlice.actions;
export default userSlice.reducer;
