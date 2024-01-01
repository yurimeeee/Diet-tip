import "./styles/App.css";
import "./styles/common.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./components/Router";
import { app } from "../src/firebase";

function App() {
  return (
    <div className="App">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
