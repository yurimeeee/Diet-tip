import React, {Component} from "react";
import App from "../App";
import HealthBanner from "../components/HealthBanner";
import HealthLevel from "../components/HealthLevel";
import "../styles/health.css";
import HealthSlide from "../components/HealthSlide";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from 'swiper/modules';

function Health(){
  return (
    <>
      <div className="container">
        <HealthBanner/>
        <div className="healthLevel">
          <h2 className="sectionTitle tt4">나에게 딱 맞는 운동을 만나보세요!</h2>
          <div className="levels df jcc aic">
            <HealthLevel/>
          </div>
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
          <SwiperSlide>
            <HealthSlide/>
          </SwiperSlide>   
        </Swiper>
        </div>
      </div>
    </>
  );
  };

export default Health;


