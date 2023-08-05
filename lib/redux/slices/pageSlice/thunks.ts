import { logout } from '@/lib/firebase/auth/logout';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logoutAsync = createAsyncThunk(
  "board/logoutAsync",
  async () => {
    return await logout();
  }
);