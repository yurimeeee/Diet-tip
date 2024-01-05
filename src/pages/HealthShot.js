import React, { useState, useEffect } from "react";
import App from "../App";
import HealthBanner2 from "../components/HealthBanner2";
import "../styles/health.css";
import HealthImg from "../components/HealthImg";
import HealthCreate from "../components/HealthCreate";

function Healthshot() {

  const [isWritingMode, setIsWritingMode] = useState(false);

  const handleModeChange = (val) => {
    setIsWritingMode(val);
  };

  return (
    <div className="healthShot container">
      {/* <HealthBanner2 /> */}
      <HealthBanner2
        isWritingMode={isWritingMode}
        onModeChange={handleModeChange}
      />
      {isWritingMode && (
        <HealthCreate
          isWritingMode={isWritingMode}
          onModeChange={handleModeChange}
        />
      )}
      <HealthImg/>
    </div>    
  );
}
export default Healthshot;
