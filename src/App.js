import "./styles/App.css";
import "./styles/common.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./components/Router";
import {app} from '../src/firebase';
import Health from "./pages/Health";

function App() {
  return (
    <div className="App">
      <Header />
      <RouterProvider router={AppRouter} />
      <Health/>
      <Footer />
    </div>
  );
}

export default App;
