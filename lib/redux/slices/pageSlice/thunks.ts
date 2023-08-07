import { logout } from '@/lib/firebase/auth/logout';
import signUp from '@/lib/firebase/auth/sign-up';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logoutAsync = createAsyncThunk(
  "board/logoutAsync",
  async () => {
    return await logout();
  }
);

export const signUpAsync = createAsyncThunk(
  "board/signUpAsync",
  async (payload: { email: string, password: string }) => {
    const { error } = await signUp(payload.email, payload.password);
    return (error) ? "Error: Login Failed" : "";
  }
);