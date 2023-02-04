import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    value: "dex",
  },
  reducers: {
    deuser: (state, user) => {
      
      state.value = user.payload;
      
    },
  },
});

export const { deuser } = userSlice.actions;
export default userSlice;
