import React from "react";
import '../styles/main.css';
import Banner from "../components/Banner";
import Today from "../components/Today";
import mealImg from "../asset/meal/meal.png";

const Main = () => {
  return(
    <main className="Main container">
      <Banner/>
      <Today/>
      <div className="hot-board">
        <h5>HOT한 다이어팁! 인기 게시물</h5>
        <div className="hot-board-buttons">
          <button className="w-green-btn" type="button">식단공유</button>
          <button className="w-green-btn" type="button">추천제품</button>
          <button className="w-green-btn" type="button">운동인증</button>
          <button className="w-green-btn" type="button">자유게시판</button>
          <button className="w-green-btn" type="button">Q&A</button>
        </div>
        <div className="hot-board-main">
          <div className="img-container">
            <img alt="hot meal" src={mealImg} className="board-img"></img>
          </div>
        </div>
        
      </div>
    </main>
  )
};

export default Main;
