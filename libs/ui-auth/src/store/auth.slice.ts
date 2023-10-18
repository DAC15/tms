import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyUserDto } from '@tms/shared-models';
import { getInitialState } from './auth.state';

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setLoaded: (state) => {
      state.loaded = true;
    },
    setUser: (state, action: PayloadAction<{ user: MyUserDto }>) => {
      state.user = action.payload.user;
    },
  },
});
