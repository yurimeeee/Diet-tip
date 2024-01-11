import React from "react";
import youtubeData from "../data/youtubeData.json";
import exerciseIcon from "../asset/exercise-icon.png";
import FormatLongNumber from "../components/numberFormat";

function Exercise(){

  const url = "https://www.youtube.com/";
  const numbers = youtubeData[0].statistics.subscriberCount;

  return(
    <section className="exercise">
      <div className="exercise-title">
        <h5>추천 운동 유튜버</h5>
      </div>
      <div className="recommand-exercise df">
        <div className="exercise-card">
          <img src={exerciseIcon} alt="exercise icon" className="exercise-icon"></img>
          <h5>추천 운동 유튜버</h5>
          <p>다이터팁이 추천하는 운동 유투버와 함께 운동 습관을 길러보세요!</p>
          <span className="w-badge">#운동습관</span>
        </div>
        <div className="exercise-card video">
          <img className="video-container" src={youtubeData[0].snippet.thumbnails.medium.url} />
          <h5>{youtubeData[0].snippet.localized.title}</h5>
          <div className="channelInfo df jcc">
            <p>
              구독자 <span>{FormatLongNumber(youtubeData[0].statistics.subscriberCount)}</span>
            </p>
            <p> · </p>
            <p>영상{youtubeData[0].statistics.videoCount}개</p>
          </div>
          <button className="w-green-btn"
            onClick={() => {
              window.open(url + youtubeData[0].snippet.customUrl);
            }}>채널가기</button>
        </div>
        <div className="exercise-card video">
          <img className="video-container" src={youtubeData[6].snippet.thumbnails.medium.url} />
          <h5>{youtubeData[6].snippet.localized.title}</h5>
          <div className="channelInfo df jcc">
            <p>
              구독자 <span>{FormatLongNumber(youtubeData[6].statistics.subscriberCount)}</span>
            </p>
            <p> · </p>
            <p>영상{youtubeData[6].statistics.videoCount}개</p>
          </div>
          <button className="w-green-btn"
            onClick={() => {
              window.open(url + youtubeData[6].snippet.customUrl);
            }}>채널가기</button>
        </div>
        <div className="exercise-card video">
          <img className="video-container" src={youtubeData[8].snippet.thumbnails.medium.url} />
          <h5>{youtubeData[8].snippet.localized.title}</h5>
          <div className="channelInfo df jcc">
            <p>
              구독자 <span>{FormatLongNumber(youtubeData[8].statistics.subscriberCount)}</span>
            </p>
            <p> · </p>
            <p>영상{youtubeData[8].statistics.videoCount}개</p>
          </div>
          <button className="w-green-btn"
            onClick={() => {
              window.open(url + youtubeData[8].snippet.customUrl);
            }}>채널가기</button>
        </div>    
      </div>
    </section >
  )
}

export default Exercise;