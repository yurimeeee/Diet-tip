import React, {useEffect, useState} from "react";
import "../styles/health.css";
import testImg from "../asset/health/testImg.png"
import axios from "axios";

function LevelCont(props) {
  const [playlist, setPlaylist] = useState([]);
  const url = "https://www.youtube.com/watch?v="

  useEffect(() => {

  const params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      q: props.search,
      part: "snippet",
      type: "video",
      maxResults: 3,
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

  // const params = {
  //     key: process.env.REACT_APP_YOUTUBE_API_KEY,
  //     // q: props.search,
  //     part: "statistics",
  //     type: "video",
  //     maxResults: 3,
  //     fields: "items(statistics)",
  // };
  // axios
  //   .get(
  //     `https://www.googleapis.com/youtube/v3/videos`,{params}
  //   )
  //   .then((res) => { //성공했을 때
  //     console.log(res);
  //     setPlaylist(res.data.items);
  //   })
  //   .catch((err) => { //실패했을 때
  //     console.log(err);
  //   });
  }, [props]);


  console.log(playlist);


  return (
    <div className="LevelCont">

      <div className="levelContWrap df jcsb">
        {playlist.map(playObj => {
          return (
            <>
            <div className="levelWrap">
              <div className="levelImg">
                <img src={playObj.snippet.thumbnails.high.url} alt=""/>
              </div>
              <h3 onClick={()=>{window.open(url + playObj.id.videoId)}}>{playObj.snippet.title}</h3>
              <p>조회수:1234회<span>·</span>{playObj.snippet.publishTime}</p>
              <div className="youtubeProfile df">
                <img src={testImg}/>
                <p>{playObj.snippet.channelTitle}</p>
              </div>
            </div>
            </>
          )   
        })}  
      </div>
      <div className="MoreBtn">
        <button>더보기</button>  
      </div>
    </div>
  )
}

export default LevelCont

