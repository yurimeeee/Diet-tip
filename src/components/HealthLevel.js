import React, { useEffect, useState } from "react";
import "../styles/health.css";
import seed from "../asset/health/iconSeed.png";
import Sprout from "../asset/health/iconSprout.png";
import Tree from "../asset/health/iconTree.png";
import LevelCont from "./LevelCont";

const level = [
  {
    img: seed,
    title: "씨앗운동",
    subtitle:"운동을 시작하기 어려운 초보자를 위한 추천 운동",
    list: <LevelCont search="초보운동"/>,
    id: 0
  },
  {
    img: Sprout,
    title: "새싹운동",
    subtitle: "운동이 재밌어지고 있는 운린이들을 위한 추천 운동",
    list: <LevelCont search="헬린이"/>,
    id: 1
  },
  {
    img: Tree,
    title: "나무운동",
    subtitle: "매일 매일 운동하는 프로 운동러들을 위한 추천 운동",
    list: <LevelCont search="홈트"/>,
    id: 2
  }
]

function HealthLevel() {
  const [selectedItem, setSelectedItem] = useState(
    level[0]
  );

  return(
    <div>
      <div className="level df jcc aic">
        {level.map(item => (
          <div className="jcc aic" key={item.id}>  
            <img src={item.img}/>
            <h2 className="day">{item.title}</h2>
            <p>{item.subtitle}</p>
            <button type="button" className="w-red-btn" onClick={()=>{
              setSelectedItem(item);
            }}>시작하기</button>
          </div>
        ))}
      </div>
      <div>
        {selectedItem.list}
      </div>
    </div>
  )
}

export default HealthLevel

