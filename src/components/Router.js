import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Calories from "../pages/Calories";
import Main from "../pages/Main";
import DailyMeal from "../pages/DailyMeal";
import Mypage from "../pages/Mypage";
import Login from "../pages/Login";
import Signin from "../pages/Signin";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/mypage",
    element: <Mypage />,
  },
  {
    path: "/meal",
    element: <DailyMeal />,
  },
  {
    path: "/calories",
    element: <Calories />,
  },
]);
export default AppRouter;
