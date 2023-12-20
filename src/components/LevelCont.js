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
      maxResults: 10,
      fields: "items(id,snippet(title,thumbnails,description))",
      videoEmbeddable: true,
  };
  // axios
  //   .get(
  //     `https://www.googleapis.com/youtube/v3/search`,{params}
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
              <p>{playObj.snippet.title}</p>
              <p>조회수:1234회 1개월전</p>
              <div className="youtubeProfile df">
                <img src={testImg}/>
                <p>닉네임</p>
              </div>
            </div>
            </>
          )   
        })}  
      </div>  
    </div>
  )
}

export default LevelCont

