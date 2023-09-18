import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  userName: "", 
  email: ""
}

const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
  },
});

export default userSlice.reducer;
export const { setUserName, setProfile } = userSlice.actions;