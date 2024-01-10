import "./styles/common.css";

import Header from "./components/Header";
import MobileHeader from "./components/MobileHeader";
import Footer from "./components/Footer";
import AppRouter from "./components/Router";
import { app } from "../src/firebase";

function App() {
  return (
    <div className="App">
      <Header />
      <MobileHeader />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
