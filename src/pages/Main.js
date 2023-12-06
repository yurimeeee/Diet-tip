import React from "react";
import '../styles/main.css';
import Banner from "../components/Banner";
import Weekly from "../components/Weekly";
import Today from "../components/Today";

const Main = () => {
  return(
    <div className="Main container">
      <Banner/>
      <Today/>
    </div>

  )
};

export default Main;
