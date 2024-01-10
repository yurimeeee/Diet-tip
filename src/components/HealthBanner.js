import React, { useEffect, useState} from "react";
import axios from "axios";
import Loading from "./Loading";

function HealthBanner() {
	const [playlist, setPlaylist] = useState([]);
  const url = "https://www.youtube.com/watch?v="

  useEffect(() => {

  const params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      q: "하루스트레칭",
      part: "snippet",
      type: "video",
      maxResults: 1,
      fields: "items(id,snippet(title,thumbnails,description))",
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
  }, []);

  console.log(playlist);

	return(
		<div className="bannerWrap web-shadow">
      {playlist.length === 0 && <Loading />}
			{playlist.map(playObj => {
				return (
				<>
					<div className="bannerTitle">
						<ul>
								<li><span>#오늘의요가</span></li>
								<li><span>#하루스트레칭</span></li>
								<li><span>#몸을깨우는스트레칭</span></li>
						</ul>
						<div className="bannerMainTitle">
							<h1>오늘의 <p>잠깐</p> 스트레칭</h1>
						</div>
						<div className="bannerSubTitle">
							<h3>{playObj.snippet.title}</h3>
						</div>
						<button type="button" className="youtubeBtn w-green-btn"
						onClick={()=>{window.open(url + playObj.id.videoId)}}>유튜브 보러가기</button>
					</div>
					<div className="bannerImg">
						<img className="img1" src={playObj.snippet.thumbnails.high.url} alt="" />
					</div>
				</>
				)})}
		</div>		
	)
}

export default HealthBanner;