import React from "react";
import App from "../App";
import HealthBanner from "../components/HealthBanner";
import HealthLevel from "../components/HealthLevel";
import "../styles/health.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";
// import Kakao from "../components/Kakao";
import youtubeData from "../data/youtubeData.json";

function Health() {
  const url = "https://www.youtube.com/";

  return (
    <>
      <div className="container">
        <HealthBanner />
        <div className="healthLevel">
          <h2 className="sectionTitle tt4">
            나에게 딱 맞는 운동을 만나보세요!
          </h2>
          <div className="levels">
            <HealthLevel />
          </div>
        </div>
      </div>
      <div className="recomSlide">
        <h2 className="sectionTitle tt4 jcc">
          아직도 운동을 시작하지 못했다면?
        </h2>
        <p>다이어팁이 추천하는 운동 유튜버와 함께 운동 루틴을 만들어보세요!</p>
        <div className="healthSlides">
          <Swiper
            slidesPerView={5}
            spaceBetween={25}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {youtubeData.map((data) => {
              return (
                <SwiperSlide>
                  <div className="recomSlide jcc aic">
                    <div className="recomImg">
                      <img src={data.snippet.thumbnails.high.url} />
                    </div>
                    <h2>{data.snippet.localized.title}</h2>
                    <h2>{data.snippet.customUrl}</h2>
                    <div className="channelInfo df jcc">
                      <p>구독자{data.statistics.subscriberCount}명</p>
                      <p>영상{data.statistics.videoCount}개</p>
                    </div>
                    <div className="df jcc">
                      <button
                        type="button"
                        className="w-red-btn"
                        onClick={() => {
                          window.open(url + data.snippet.customUrl);
                        }}
                      >
                        채널보기
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
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
