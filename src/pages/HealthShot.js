import React, { useState, useEffect } from "react";
import App from "../App";
import HealthBanner2 from "../components/HealthBanner2";
import "../styles/health.css";
import MealCreate from "../components/MealCreate";
import HealthImg from "../components/HealthImg";

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
      <HealthImg/>

    </div>
    
  );
}
export default Healthshot;
