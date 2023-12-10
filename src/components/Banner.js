import React from "react";
import level1Img from "../asset/level-1-badge.png";
import level2Img from "../asset/level-2-badge.png";
import level3Img from "../asset/level-3-badge.png";


const Banner = () => {
  return(
    <section className="banner">
      <div className="banner-text">
        <p>다이어팁에 처음 왔다면</p>
        <p>내 <span>관리레벨 테스트하고</span> 예쁜 <span>레벨 뱃지</span> 받자!</p>
        <button className="w-green-btn" type="button">테스트 시작하기</button>
      </div>
      <div className="banner-img">
        <img src={level1Img} className="level-badge" alt="level badge"></img>
        <img src={level2Img} className="level-badge" alt="level badge"></img>
        <img src={level3Img} className="level-badge" alt="level badge"></img>
      </div>
    </section>
  )
}

export default Banner;