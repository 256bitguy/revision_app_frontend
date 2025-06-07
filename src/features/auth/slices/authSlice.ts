import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosInstance';
import { loginUser } from './authAPI';
export interface RegisterPayload {
  email: string;
  password: string;
  avatar: File | null;
  coverImage?: File | null;
  username: string;
  fullName: string;
   
}
export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterPayload)  => {
   
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('username', userData.username.toLowerCase());
    formData.append('fullName', userData.fullName);
    if (userData.avatar) formData.append('avatar', userData.avatar);
    if (userData.coverImage) formData.append('coverImage', userData.coverImage);

    const res = await axiosInstance.post('/users/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    localStorage.setItem('accessToken', res.data.token);
    console.log(res,"dekho yaha")
    return res.data.statusCode;  // expect { user, token }
  }
);

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null,
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('accessToken'), // initialize token from localStorage if present
  loading: false,
  error: null,
};
export interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  
}

export interface LoginResponse {
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser:(state,action) =>{
      state.user = action.payload.user
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })

      
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action ) => {
      state.user = action.payload?.data.user;
      state.token = action.payload.data.accessToken;
      state.loading = false;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message || 'Login failed';
    });
  },
});

export const {setUser, logout } = authSlice.actions;
export default authSlice.reducer;
