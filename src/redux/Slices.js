import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ShowToast } from '../GlobalFunctions';
// Initial state
const initialState = {
  userData: {},
  token: '',
  message: '',
  isLoading: false,
  error: null,
};

// Async thunk for user login
export const UserLogin = createAsyncThunk(
  'auth/UserLogin',
  async (config, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      const resData = response.data;

      console.log('Login Response ===>', JSON.stringify(resData));

      if (resData.success) {
        if (resData.token && resData.data) {
          ShowToast('success', 'Login Successful');
          return resData;
        } else {
          ShowToast('error', resData.message);
          return resData;
        }
      } else {
        ShowToast('error', resData?.message || 'Login failed');
        return rejectWithValue('Login failed');
      }
    } catch (error) {
      console.log(
        'Login Error:',
        error.response?.data?.message || error.message,
      );
      ShowToast(
        'error',
        error.response?.data?.message || 'Something went wrong',
      );
      return rejectWithValue('Something went wrong');
    }
  },
);

// Redux Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: state => {
      state.token = '';
      state.userData = {};
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(UserLogin.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.token && action.payload.data) {
          state.token = action.payload.token;
          state.userData = action.payload.data;
          console.log('Login success — token & userData set');
        } else {
          console.log('Phone login flow — waiting for OTP verification');
        }
        console.log('action.payload<<<<=====', action.payload);
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearToken, setUserData, setToken } = authSlice.actions;
export default authSlice.reducer;
