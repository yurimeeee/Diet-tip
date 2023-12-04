import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Calories from "../pages/Calories";
import Main from "../pages/Main";
import DailyMeal from "../pages/DailyMeal";
import Mypage from "../pages/Mypage";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
