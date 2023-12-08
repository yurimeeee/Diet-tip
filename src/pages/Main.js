import React from "react";
import '../styles/main.css';
import Banner from "../components/Banner";
import Today from "../components/Today";
import mealImg from "../asset/meal/meal.png";
import likeImg from "../asset/like.png";
import likeImgDark from "../asset/like-icon-dark.png";
import replyIcon from "../asset/reply-icon.png";
import likefillImg from "../asset/like-fill.png";
import profile from "../asset/profile-icon.png";
import exerciseIcon from "../asset/exercise-icon.png";
import { useRef } from 'react';

const Main = () => {
  // const likeIcon = useRef(null);

  // const liked = (e) => {
  //   e.currentTarget.classList.toggle('liked');
  //   if(e.currentTarget.classList.contains('liked')){
  //     e.currentTarget.setAttribute('src',likefillImg);
  //   }
  // }

  // const moveYN = (e) => {
  //   const img = e.currentTarget.querySelector('img');
  //   if(img.classList.contains('liked')){
  //     e.preventDefault();
  //   }
  // }

  return(
    <main className="Main container">
      <Banner/>
      <Today/>
      <section className="hot-board">
        <h5>HOT한 다이어팁! 인기 게시물</h5>
        <div className="hot-board-buttons">
          <button className="w-green-btn" type="button">식단공유</button>
          <button className="w-green-btn" type="button">추천제품</button>
          <button className="w-green-btn" type="button">운동인증</button>
          <button className="w-green-btn" type="button">자유게시판</button>
          <button className="w-green-btn" type="button">Q&A</button>
        </div>
        <div className="hot-board-main img-ver">
          <div className="img-container">
            <img alt="hot meal" src={mealImg} className="board-img"></img>
            <a href="/" className="like-container"><img alt="like icon" src={likeImg}></img></a>
          </div>
          <div className="img-container">
            <img alt="hot meal" src={mealImg} className="board-img"></img>
            <a href="/" className="like-container"><img alt="like icon" src={likeImg}></img></a>
          </div>
          <div className="img-container">
            <img alt="hot meal" src={mealImg} className="board-img"></img>
            <a href="/" className="like-container"><img alt="like icon" src={likeImg}></img></a>
          </div>
          <div className="img-container">
            <img alt="hot meal" src={mealImg} className="board-img"></img>
            <a href="/" className="like-container"><img alt="like icon" src={likeImg}></img></a>
          </div>
          <div className="img-container">
            <img alt="hot meal" src={mealImg} className="board-img"></img>
            <a href="/" className="like-container"><img alt="like icon" src={likeImg}></img></a>
          </div>
          <div className="img-container">
            <img alt="hot meal" src={mealImg} className="board-img"></img>
            <a href="/" className="like-container"><img alt="like icon" src={likeImg}></img></a>
          </div>
          <div className="img-container">
            <img alt="hot meal" src={mealImg} className="board-img"></img>
            <a href="/" className="like-container"><img alt="like icon" src={likeImg}></img></a>
          </div>
          <div className="img-container">
            <img alt="hot meal" src={mealImg} className="board-img"></img>
            <a href="/" className="like-container"><img alt="like icon" src={likeImg}></img></a>
          </div>
          <div className="img-container">
            <img alt="hot meal" src={mealImg} className="board-img"></img>
            <a href="/" className="like-container"><img alt="like icon" src={likeImg}></img></a>
          </div>
          <div className="img-container">
            <img alt="hot meal" src={mealImg} className="board-img"></img>
            <a href="/" className="like-container"><img alt="like icon" src={likeImg}></img></a>
          </div>
        </div>
        <div className="hot-board-main text-ver">
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
      </section>
      <section className="recommand-exercise">
        <div className="exercise-card">
          <img src={exerciseIcon} alt="exercise icon" className="exercise-icon"></img>
          <h5>날씨에 맞는 추천 운동</h5>
          <p>오늘처럼 흐린 날에는 관절에 무리가 갈 수 있어요. 과하지 않은 실내 운동을 추천해요! 일교차에도 유의하세요.</p>
          <span class="w-badge"># 홈트레이닝</span>
        </div>
        <div className="exercise-card video">
          <div className="video-container"></div>
          <button class="w-green-btn">브릿지 동작</button>
        </div>
        <div className="exercise-card video">
          <div className="video-container"></div>
          <button class="w-green-btn">브릿지 동작</button>
        </div>
        <div className="exercise-card video">
          <div className="video-container"></div>
          <button class="w-green-btn">브릿지 동작</button>
        </div>
      </section>
    </main>
  )
};

export default Main;
