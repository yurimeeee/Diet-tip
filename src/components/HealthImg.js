import React from "react";
import "../styles/health.css";
import test from "../asset/health/testImg.png"

function HealthImg(){
  return(
    <div className="grid">
      <div className="grid-item">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg" />
      </div>
      <div className="grid-text df">
        <div>
         <img src={test}/>
         <p>닉네임</p>
        </div>
        <div>
          <p>좋아요</p>
        </div>
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
  )
}

export default HealthImg;