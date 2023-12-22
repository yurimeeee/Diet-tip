import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calories from "../pages/Calories";
import Main from "../pages/Main";
import DailyMeal from "../pages/DailyMeal";
import Health from "../pages/Health";
import Healthshot from "../pages/HealthShot";
import Mypage from "../pages/Mypage";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import FreeBoard from "../pages/FreeBoard";
import QnA from "../pages/QnA";
import Alert from "../pages/Alert";

// const AppRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signin",
//     element: <Signin />,
//   },
//   {
//     path: "/mypage",
//     element: <Mypage />,
//   },
//   {
//     path: "/alert",
//     element: <Alert />,
//   },
//   {
//     path: "/meal",
//     element: <DailyMeal />,
//   },
//   {
//     path: "/calories",
//     element: <Calories />,
//   },
//   {
//     path: "/health",
//     element: <Health />,
//   },
//   {
//     path: "/healthshot",
//     element: <Healthshot />,
//   },
//   {
//     path: "/freeboard",
//     element: <FreeBoard />,
//   },
//   {
//     path: "/qnaboard",
//     element: <QnA />,
//   },
// ]);

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/alert" element={<Alert />}></Route>
        <Route path="/meal" element={<DailyMeal />}></Route>
        <Route path="/calories" element={<Calories />}></Route>
        <Route path="/health" element={<Health />}></Route>
        <Route path="/healthshot" element={<Healthshot />}></Route>
        <Route path="/freeboard" element={<FreeBoard />}></Route>
        <Route path="/qnaboard" element={<QnA />}></Route>
      </Routes>
    </>
  );
};

export default AppRouter;
