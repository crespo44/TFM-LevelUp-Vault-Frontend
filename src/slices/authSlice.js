import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: null,
  name: null,   
  email: null, 
  rol: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, username, name, email, rol } = action.payload;
      state.token = token;
      state.username = username;
      state.name = name;
      state.email = email;
      state.rol = rol;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.name = null;
      state.email = null;
      state.rol = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;