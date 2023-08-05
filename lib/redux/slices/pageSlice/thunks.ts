import { logout } from '@/lib/firebase/auth/logout';
import signIn from '@/lib/firebase/auth/sign-in';
import signUp from '@/lib/firebase/auth/sign-up';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logoutAsync = createAsyncThunk(
  "board/logoutAsync",
  async () => {
    return await logout();
  }
);

export const loginAsync = createAsyncThunk(
  "board/loginAsync",
  async (payload: { email: string, password: string }) => {
    const { error } = await signIn(payload.email, payload.password);
    return (error) ? "Error: Login Failed" : "";
  }
);

export const signUpAsync = createAsyncThunk(
  "board/signUpAsync",
  async (payload: { email: string, password: string }) => {
    const { error } = await signUp(payload.email, payload.password);
    return (error) ? "Error: Login Failed" : "";
  }
);