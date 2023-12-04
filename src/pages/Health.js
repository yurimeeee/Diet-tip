import React, {Component} from "react";
import App from "../App";
import HealthBanner from "../components/HealthBanner";
import "../styles/health.css";

const Health = () => {
    return (
      <div className="container">
        <HealthBanner/>
      </div>
    );
  };

export default Health;
