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
        <p className="subTitle">다이어팁이 추천하는 운동 유튜버와 함께 운동 루틴을 만들어보세요!</p>
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
                        <div className="recomImg" >
                        <img src={data.snippet.thumbnails.high.url}/>  
                        </div>
                        <div className="recomInfo">
                          <h2>{data.snippet.localized.title}</h2>
                          <h3>{data.snippet.customUrl}</h3>
                          <div className="channelInfo df jcc">
                            <p>구독자{data.statistics.subscriberCount}명</p>
                            <p>·</p>
                            <p>영상{data.statistics.videoCount}개</p>
                          </div>
                        </div>
                        <div className="df jcc">
                          <button type="button" className="w-red-btn" 
                          onClick={()=>{window.open(url + data.snippet.customUrl)}}>
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
      <div className="kakaoMap container">
        <h2 className="sectionTitle tt4 jcc">우리동네 운동맛집</h2>
        <p className="subTitle">
          내 주변 가까운 운동시설을 확인해보고 오늘부터 운동을 시작해보세요!
        </p>
        <form>
          <input type="text" placeholder="헬스장" name="search"/>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 20 20"
              fill="none"
              >
              <path
                d="M14.6777 12.9299C15.6661 11.5841 16.25 9.92275 16.25 8.125C16.25 3.63769 12.6123 0 8.125 0C3.63769 0 0 3.63769 0 8.125C0 12.6123 3.63769 16.25 8.125 16.25C9.92323 16.25 11.585 15.6658 12.9309 14.6769L12.9299 14.6777C12.9667 14.7277 13.0078 14.7756 13.053 14.8208L17.8661 19.6339C18.3543 20.122 19.1457 20.122 19.6339 19.6339C20.122 19.1457 20.122 18.3543 19.6339 17.8661L14.8208 13.053C14.7756 13.0078 14.7277 12.9667 14.6777 12.9299ZM15 8.125C15 11.922 11.922 15 8.125 15C4.32804 15 1.25 11.922 1.25 8.125C1.25 4.32804 4.32804 1.25 8.125 1.25C11.922 1.25 15 4.32804 15 8.125Z"
                fill="#32A061"
              />
            </svg>
          </button>
        </form>
        <Kakao/>
      </div>
      <div></div>
    </>
  );
}
export default Health;
