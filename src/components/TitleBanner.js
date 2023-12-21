// import React from "react";
import React, { useState } from "react";
import { Route, useLocation } from "react-router-dom";
import bannerImg from "../asset/meal/banner.png";
import "../styles/meal.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const TitleBanner = ({ onModeChange }) => {
  const [isWritingMode, setIsWritingMode] = useState(false);
  const navigate = useNavigate();

  const writingMode = () => {
    //로그인 유무 확인
    if (auth.currentUser) {
      setIsWritingMode(true);
      // isWritingMode 값이 변경되었음을 부모 컴포넌트에 알림
      onModeChange(true);
    } else {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  };

  const location = useLocation();
  // 만약 경로가 "/meal"이라면 Meal 컴포넌트
  const shouldShowMealComponent = location.pathname === "/meal";

  return (
    <div className="head-banner web-shadow container md-radius">
      <div>
        <p className="gray-3">
          {shouldShowMealComponent
            ? "다이어트 식단 TIP"
            : " 맛있고 건강하게 알고 먹자!"}
        </p>
        <h2 className="point-1">
          {shouldShowMealComponent ? "데일리 식단" : "칼로리 사전"}
        </h2>
        <h3 className="gray-3">
          {" "}
          {shouldShowMealComponent
            ? "오늘 당신의 식단은 무엇인가요?"
            : "다이어트도 건강하게 영양가있게"}
        </h3>
        {shouldShowMealComponent && (
          // <div>
          <span className="w-green-btn" onClick={writingMode}>
            오늘의 식단 인증하기
          </span>
          // </div>
        )}
      </div>
      <img src={bannerImg} alt="내 이미지" className="banner-img md-radius" />
    </div>
  );
};
export default TitleBanner;
