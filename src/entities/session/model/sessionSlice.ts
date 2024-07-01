import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '@/shared/lib/constants/constants';
import { Credentials } from '../../../shared/lib/types/types';

export const login = createAsyncThunk(
  'session/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      return data.token;
    } catch (error) {
      console.error(error);
    }
  }
);

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    token: '',
    isLogin: false,
  },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogin = true;
      localStorage.setItem('token', action.payload);
      localStorage.setItem('isLogin', 'true');
    },
    clearToken: (state) => {
      state.token = '';
      state.isLogin = false;
      localStorage.clear();
    },
    restoreLogin(state, action) {
      if (action.payload) {
        state.isLogin = true;
        state.token = action.payload;
      } else {
        state.isLogin = false;
        state.token = '';
      }
    },
  },
});

export const {
  setToken,
  clearToken,
  restoreLogin,
} = sessionSlice.actions;
export default sessionSlice.reducer;
