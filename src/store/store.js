import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import mealDBSlice from "./mealSlice";

const store = configureStore({
  reducer: {
    isLogin: loginSlice,
    mealDB: mealDBSlice,
  },
});

export default store;
