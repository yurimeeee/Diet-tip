import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Calories from "../pages/Calories";
import Main from "../pages/Main";
import DailyMeal from "../pages/DailyMeal";
import Health from "../pages/Health";
import Mypage from "../pages/Mypage";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import FreeBoard from "../pages/FreeBoard";
import QnA from "../pages/QnA";
import Alert from "../pages/Alert";

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
    path: "/alert",
    element: <Alert />,
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
  {
    path: "/freeboard",
    element: <FreeBoard />,
  },
  {
    path: "/qnaboard",
    element: <QnA />,
  },
]);
export default AppRouter;
