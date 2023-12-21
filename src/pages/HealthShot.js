import React, { useState, useEffect } from "react";
import App from "../App";
import HealthBanner2 from "../components/HealthBanner2";
import "../styles/health.css";
import MealCreate from "../components/MealCreate";
import TitleBanner from "../components/TitleBanner";


function Healthshot() {

  const [isWritingMode, setIsWritingMode] = useState(false);

  const handleModeChange = (val) => {
    setIsWritingMode(val);
  };

  return (
    <div className="container">
      {/* <HealthBanner2 /> */}
      <HealthBanner2
        isWritingMode={isWritingMode}
        onModeChange={handleModeChange}
      />
      {isWritingMode && (
        <MealCreate
          isWritingMode={isWritingMode}
          onModeChange={handleModeChange}
        />
      )}

      <div className="grid">
        <div className="grid-sizer"></div>
        <div className="grid-item">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg" />
        </div>
        <div className="grid-item">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg" />
        </div>
        <div className="grid-item">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/look-out.jpg" />
        </div>
        <div className="grid-item">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/one-world-trade.jpg" />
        </div>
        <div className="grid-item">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/drizzle.jpg" />
        </div>
        <div className="grid-item">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/cat-nose.jpg" />
        </div>
        <div className="grid-item">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/contrail.jpg" />
        </div>
        <div className="grid-item">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/golden-hour.jpg" />
        </div>
        <div className="grid-item">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/flight-formation.jpg" />
        </div>
      </div>

    </div>
    
  );
}
export default Healthshot;
