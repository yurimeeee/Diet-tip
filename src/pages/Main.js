import React, { useEffect, useState } from "react";
import '../styles/main.css';
import Banner from "../components/Banner";
import Today from "../components/Today";
import mealImg from "../asset/meal/meal.png";
import likeImg from "../asset/like.png";
import likeImgDark from "../asset/like-icon-dark.png";
import replyIcon from "../asset/reply-icon.png";
import likefillImg from "../asset/like-fill.png";
import profile from "../asset/profile-icon.png";
import Exercise from "../components/Exercise";
import { useRef } from 'react';

const OnlyImg = () => {
  return(
    <div className="hot-board-main img-ver" data-type="onlyimg">
      <div className="img-container">
        <img alt="hot meal" src={mealImg} className="board-img"></img>
      </div>
    </div>
  )
}

const ImgText = () => {
  return(
    <div className="hot-board-main text-ver" data-type="imgtext">
      <div className="text-card">
        <img className="text-card-img" alt="hot board img" src={mealImg}></img>
        <div className="text-card-text">
          <div className="text-card-title">
            <p>청사과 반쪽 썰어서 아침으로 먹었어요</p>
          </div>
          <div className="profile">
            <p className="profile-content"><img src={profile} className="profile-icon" alt="profile icon"></img>eeuns_diary</p>
            <div>
              <p className="profile-content"><img src={likeImgDark} className="like-icon" alt="like icon"></img>6</p>
              <p className="profile-content"><img src={replyIcon} className="reply-icon" alt="reply icon"></img>6</p>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

const OnlyText = () => {
  return(
    <div className="hot-board-main text-ver no-img" data-type="onlytext">
      <div className="text-card">
        <div className="text-card-text">
          <div className="text-card-title">
            <p>청사과 반쪽 썰어서 아침으로 먹었어요</p>
          </div>
          <div className="profile">
            <p className="profile-content"><img src={profile} className="profile-icon" alt="profile icon"></img>eeuns_diary</p>
            <div>
              <p className="profile-content"><img src={likeImgDark} className="like-icon" alt="like icon"></img>6</p>
              <p className="profile-content"><img src={replyIcon} className="reply-icon" alt="reply icon"></img>6</p>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}


const Main = () => {
  const [boardtype,setBoardType] = useState('onlyimg');
  const setType = (e) => {
    setBoardType(e.currentTarget.getAttribute('data-type'));
    console.log(boardtype);
  }

  let content;

  const renderContent = (boardtype) => {
    switch (boardtype) {
      case 'onlyimg':
        content = <OnlyImg />;
        break;
      case 'imgtext':
        content = <ImgText />;
        break;
      case 'onlytext':
        content = <OnlyText />;
        break;
      default:
        content = <OnlyImg />;
    }
  }

  return(
    <main className="Main container">
      <Banner/>
      <Today/>
      <section className="hot-board">
        <h5>HOT한 다이어팁! 인기 게시물</h5>
        <div className="hot-board-buttons">
          <button className="w-green-btn" type="button" data-type="onlyimg" onClick={setType}>식단공유</button>
          <button className="w-green-btn" type="button" data-type="imgtext" onClick={setType}>추천제품</button>
          <button className="w-green-btn" type="button" data-type="imgtext" onClick={setType}>운동인증</button>
          <button className="w-green-btn" type="button" data-type="onlytext" onClick={setType}>자유게시판</button>
          <button className="w-green-btn" type="button" data-type="onlytext" onClick={setType}>Q&A</button>
        </div>
        {boardtype === 'onlyimg' && <OnlyImg/>}
        {boardtype === 'imgtext' && <ImgText/>}
        {boardtype === 'onlytext' && <OnlyText/>}
      </section>
      <Exercise/>
    </main>
  )
};

export default Main;
