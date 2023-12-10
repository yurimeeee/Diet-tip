import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: false };

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    yesLogin: state => {
      state.value = true;
    },
    noLogin: state => {
      state.value = false;
    }
  }
});

export const { yesLogin, noLogin } = loginSlice.actions;
export default loginSlice.reducer;