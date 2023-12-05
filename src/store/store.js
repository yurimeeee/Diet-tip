import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './loginSlice';

const store = configureStore({
  reducer: {
    isLogin : loginSlice
  }
});



export default store;