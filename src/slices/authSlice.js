import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, username, role } = action.payload;
      state.token = token;
      state.username = username;
      state.role = role;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;