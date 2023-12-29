import React, { useState } from "react";
import "../styles/health.css";
import seed from "../asset/health/iconSeed.png";
import Sprout from "../asset/health/iconSprout.png";
import Tree from "../asset/health/iconTree.png";
import youtubeData2 from "../data/youtubeData2.json"
import FormatLongNumber from "../components/numberFormat"
import moment from "moment";

const level = [
  {
    img: seed,
    title: "씨앗운동",
    subtitle:"운동을 시작하기 어려운 초보자를 위한 추천 운동",
    list: youtubeData2.seed.items,
    id: 0
  },
  {
    img: Sprout,
    title: "새싹운동",
    subtitle: "운동이 재밌어지고 있는 운린이들을 위한 추천 운동",
    list: youtubeData2.sprout.items,
    id: 1
  },
  {
    img: Tree,
    title: "나무운동",
    subtitle: "매일 매일 운동하는 프로 운동러들을 위한 추천 운동",
    list: youtubeData2.tree.items,
    id: 2
  }
]

const list = []
for(var i=0;i<youtubeData2.tree.items.length;i++){
  list.push(youtubeData2.tree.items[i].snippet.channelId)
}
console.log(list)

function HealthLevel() {

  const [selectedItem, setSelectedItem] = useState(level[0]);
  const url = "https://www.youtube.com/watch?v=";

  return(
    <>
      <div className="level df jcc aic">
        {level.map(item => (
          <div className="levelIcon jcc aic" key={item.id}>  
            <img src={item.img}/>
            <h2 className="day">{item.title}</h2>
            <p>{item.subtitle}</p>
            <button 
              type="button"
              className={"w-red-btn " + (item.id == selectedItem.id ? " active" : "")}
              onClick={()=>{
                setSelectedItem(item);
              }}>
              시작하기
            </button>
          </div>         
        ))}
      </div>
      <div className="LevelCont">
        <div className="levelContWrap df jcsb">
          {selectedItem.list.slice(0,9).map((item) => {
            const numbers = item.statistics.viewCount;
            return (
              <div className="levelWrap">
                <div className="levelImg">
                  <img src={item.snippet.thumbnails.high.url} alt=""/>
                </div>
                <h3 
                onClick={()=>{window.open(url + item.id.videoId)}}>
                  {item.snippet.title}
                </h3>
                <p>조회수 <span>{FormatLongNumber(numbers)}</span> 회
                  <span> · </span>
                  {moment(item.snippet.publishTime).fromNow()}
                </p>
                <div className="youtubeProfile df">
                  <img src={item.statistics.thumbnails.default.url}/>
                  <p>{item.snippet.channelTitle}</p>
                </div>
              </div>                       
            )
          })}
          <div className="MoreBtn">
            <button>더보기</button>  
          </div>
        </div>

      </div>
    </>
  )
}

export default HealthLevel

