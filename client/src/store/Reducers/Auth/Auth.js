import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: { email: "lalit.kumar+1@gmail.com", password: "TBdbGyDDvC" },
};

export const Auth = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, payload) => {
      state.userInfo = {};
      state.userInfo = { ...state.userInfo, ...payload?.payload };
    },
    register: (state) => {},
    logout: (state) => {
      state = { ...state };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, register, logout } = Auth.actions;

export default Auth.reducer;
