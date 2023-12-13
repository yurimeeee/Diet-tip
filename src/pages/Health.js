import React, {useEffect, useState} from "react";
import App from "../App";
import HealthBanner from "../components/HealthBanner";
import HealthLevel from "../components/HealthLevel";
import "../styles/health.css";
import HealthSlide from "../components/HealthSlide";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from 'swiper/modules';
import Kakao from "../components/Kakao";
import VideoList from '../components/VideoList';


function Health(){
  const apiKey = process.env.REACT_APP_API_KEY;
  const [videos, setVideos] = useState([]);

  const searchVideos = async (keyword) => {
    const response = await apiClient.get("search", {
      params: {
        part: "snippet",
        q: keyword,
        type: "video",
        maxResults: 20,
      },
    });
};

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=KR&maxResults=25&key=${apiKey}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <>
      <div className="container">
        <HealthBanner/>
        <div className="healthLevel">
          <h2 className="sectionTitle tt4">나에게 딱 맞는 운동을 만나보세요!</h2>
          <div className="levels df jcc aic">
            <HealthLevel/>
          </div>
          <VideoList videos={videos} />
          <video src={searchVideos}/>
        </div>
      </div>
      <div className="recomSlide">
        <h2 className="sectionTitle tt4 jcc">아직도 운동을 시작하지 못했다면?</h2>
        <p>다이어팁이 추천하는 운동 유튜버와 함께 운동 루틴을 만들어보세요!</p>
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
              <HealthSlide/>
            </SwiperSlide>   
            <SwiperSlide>
              <HealthSlide/>
            </SwiperSlide>   
            <SwiperSlide>
              <HealthSlide/>
            </SwiperSlide>   
            <SwiperSlide>
              <HealthSlide/>
            </SwiperSlide>   
            <SwiperSlide>
              <HealthSlide/>
            </SwiperSlide>   
          </Swiper>
        </div>
      </div>
      <div className="map container">
        <h2 className="sectionTitle tt4 jcc">우리동네 운동맛집</h2>
        <p>내 주변 가까운 운동시설을 확인해보고 오늘부터 운동을 시작해보세요!</p>
        <input type='text'/>
        <Kakao/>
      </div>        
      <div>
      </div>
    </>
  );
  };

export default Health;