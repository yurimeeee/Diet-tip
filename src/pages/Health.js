import React, { useEffect, useState } from "react";
import App from "../App";
import HealthBanner from "../components/HealthBanner";
import HealthLevel from "../components/HealthLevel";
import "../styles/health.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";
// import Kakao from "../components/Kakao";
import axios from "axios";
import LevelCont from "../components/LevelCont";

function Health() {
  const [playlist, setPlaylist] = useState([]);
  const url = "https://www.youtube.com/watch?v=";

  useEffect(() => {
    const params = {
      key: "AIzaSyC_NLQDH12JUt7zJDLMLnxhfYzJsnH-fVA",
      q: "하루스트레칭",
      part: "snippet",
      type: "video",
      maxResults: 10,
      fields: "items(id,etag, snippet(title,thumbnails,description))",
      videoEmbeddable: true,
    };

    axios
      .get(`https://www.googleapis.com/youtube/v3/search`, { params })
      .then((res) => {
        //성공했을 때
        console.log(res);
        setPlaylist(res.data.items);
      })
      .catch((err) => {
        //실패했을 때
        console.log(err);
      });
  }, []);

  console.log(playlist);

  return (
    <>
      <div className="container">
        <HealthBanner />
        <div className="healthLevel">
          <h2 className="sectionTitle tt4">
            나에게 딱 맞는 운동을 만나보세요!
          </h2>
          <div className="levels df jcc aic">
            <HealthLevel />
          </div>
            <LevelCont/>
        </div>
      </div>
      <div className="recomSlide">
        <h2 className="sectionTitle tt4 jcc">
          아직도 운동을 시작하지 못했다면?
        </h2>
        <p>다이어팁이 추천하는 운동 유튜버와 함께 운동 루틴을 만들어보세요!</p>
        {playlist.map((data) => {
          return (
            <div className="healthSlides">
              <Swiper
                slidesPerView={5}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="jcc aic">
                    <img src={data.snippet.title} className="recomImg" />
                    <h2>{data.snippet.title}</h2>
                    <p>{data.snippet.title}</p>
                    <div className="df jcc">
                      <button type="button" className="w-green-btn">
                        구독하기
                      </button>
                      <button type="button" className="w-red-btn">
                        영상보기
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          );
        })}
      </div>
      <div className="map container">
        <h2 className="sectionTitle tt4 jcc">우리동네 운동맛집</h2>
        <p>
          내 주변 가까운 운동시설을 확인해보고 오늘부터 운동을 시작해보세요!
        </p>
        <input type="text" />
        {/* <Kakao/> */}
      </div>
      <div></div>
    </>
  );
}
export default Health;
