import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosInstance";

// Login API


export interface LoginPayload {
  username: string;
  password: string;
}

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
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>('auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/users/login', { username, password });
    console.log(res,"res")
    localStorage.setItem('accessToken', res.data.data.accessToken);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});


// Register API
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (
    {
      fullName,
      avatar,
      coverImage = "",
      email,
      password,
      username,
    }: {
      fullName: string;
      avatar: string;
      coverImage?: string;
      email: string;
      password: string;
      username: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/users/register", {
        fullName,
        avatar,
        coverImage,
        email,
        password,
        username: username.toLowerCase(),
      });

      // Save token in localStorage
      localStorage.setItem("accessToken", response.data.token);

      return response.data; // Should contain: { token, user }
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);
