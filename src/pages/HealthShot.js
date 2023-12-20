import React from "react";
import App from "../App";
import HealthBanner2 from "../components/HealthBanner2";
import "../styles/health.css";
// import $ from 'jquery'

function Healthshot() {

  return (
    <div className="container">
      <HealthBanner2 />

      <h1>Masonry - imagesLoaded progress</h1>

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
