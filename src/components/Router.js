import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Calories from "../pages/Calories";
import Main from "../pages/Main";
import DailyMeal from "../pages/DailyMeal";
import Health from "../pages/Health";
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
  {
    path: "/health",
    element: <Health />,
  },
]);
export default AppRouter;
