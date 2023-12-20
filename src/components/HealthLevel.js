import React, { useEffect, useState } from "react";
import "../styles/health.css";
import seed from "../asset/health/iconSeed.png";
import Sprout from "../asset/health/iconSprout.png";
import Tree from "../asset/health/iconTree.png";
import LevelCont from "./LevelCont";


const level = [
    {
      "img":seed,
      "title":"씨앗운동",
      "subtitle":"운동을 시작하기 어려운 초보자를 위한 추천 운동"
    },
    {
      "img":Sprout,
      "title":"새싹운동",
      "subtitle":"운동이 재밌어지고 있는 운린이들을 위한 추천 운동"
    },
    {
      "img":Tree,
      "title":"나무운동",
      "subtitle":"매일 매일 운동하는 프로 운동러들을 위한 추천 운동"
    }
]

function HealthLevel() {
  return(
    level.map((data) => (
      <div className="level jcc aic">    
          <img src={data.img}/>
          <h2 className="day">{data.title}</h2>
          <p>{data.subtitle}</p>
        <button type="button" className="w-red-btn">시작하기</button>
      </div>
    ))
  )
}



export default HealthLevel

