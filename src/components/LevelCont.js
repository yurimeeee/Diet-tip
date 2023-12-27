import React, {useEffect, useState} from "react";
import "../styles/health.css";
import testImg from "../asset/health/testImg.png"
import axios from "axios";
import youtubeData2 from "../data/youtubeData2.json"


function LevelCont() {

  // const [playlist, setPlaylist] = useState([]);
  const url = "https://www.youtube.com/watch?v="
  var list = []

  for(var i=0;i<youtubeData2.sprout.items.length;i++){
    list.push(youtubeData2.sprout.items[i].id.videoId)
  }

  console.log(list)

  useEffect(() => {

  const params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      q: props.search,
      part: "statistics",
      type: "video",
      maxResults: 35,
      fields: "items(id,snippet)",
      videoEmbeddable: true,
  };
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/search`,{params}
    )
    .then((res) => { //성공했을 때
      console.log(res);
      setPlaylist(res.data.items);
    })
    .catch((err) => { //실패했을 때
      console.log(err);
    });
  }, [props]);


  console.log(playlist);



  return (
    <div className="LevelCont">

      <div className="levelContWrap df jcsb">
        {youtubeData2.seed.map(data => {
          return (
            <>
            <div className="levelWrap">
              <div className="levelImg">
                <img src={data.snippet.thumbnails.high.url} alt=""/>
              </div>
              <h3 
              onClick={()=>{window.open(url + data.id.videoId)}}>
                {data.snippet.title}
              </h3>
              <p>조회수:1234회
                <span>·</span>
                {data.snippet.publishTime}
              </p>
              <div className="youtubeProfile df">
                <img src={testImg}/>
                <p>{data.snippet.channelTitle}</p>
              </div>
            </div>
            </>
          )   
        })}  
      </div>
      {
      <div className="MoreBtn">
        <button>더보기</button>  
      </div>
      }
    </div>
  )
}

export default LevelCont

