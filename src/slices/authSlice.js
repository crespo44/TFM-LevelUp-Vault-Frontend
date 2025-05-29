import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: null,
  rol: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, username, rol } = action.payload;
      state.token = token;
      state.username = username;
      state.rol = rol;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.rol = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;