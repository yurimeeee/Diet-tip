import React, { useState } from "react";
import App from "../App";
import HealthBanner from "../components/HealthBanner";
import HealthLevel from "../components/HealthLevel";
import Healthslide from "../components/HealthSlide";
import "../styles/health.css";
// import Kakao from "../components/Kakao";


function Health() {
  
  return (
    <>
      <div className="container">
        <HealthBanner />
        <div className="healthLevel">
          <h2 className="sectionTitle tt4">
            나에게 딱 맞는 운동을 만나보세요!
          </h2>
          <div className="levels">
            <HealthLevel />
          </div>
        </div>
      </div>
      <div className="recomSlide">
        <h2 className="sectionTitle tt4 jcc">
          아직도 운동을 시작하지 못했다면?
        </h2>
        <p className="subTitle">
          다이어팁이 추천하는 운동 유튜버와 함께 운동 루틴을 만들어보세요!
        </p>
        <Healthslide/>
      </div>
      <div className="kakaoMap container">
        <h2 className="sectionTitle tt4 jcc">우리동네 운동맛집</h2>
        <p className="subTitle">
          내 주변 가까운 운동시설을 확인해보고 오늘부터 운동을 시작해보세요!
        </p>
        {/* <Kakao /> */}
      </div>
    </>
  );
}
export default Health;
