import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import youtubeData from "../data/youtubeData.json";
import FormatLongNumber from "../components/numberFormat";


function Healthslide(){
  const url = "https://www.youtube.com/";
  return(
    <div className="healthSlides exercise-card video">
    <Swiper
      breakpoints={{        
          480:{
        slidesPerView : 3            
        },
          720:{
        slidesPerView : 5
        },
      }}
      spaceBetween={25}
      pagination={{
        clickable: true,
        // dynamicBullets: true
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay, Pagination]}
      
      className="mySwiper"
    >
      {youtubeData.map((data) => {
        const numbers = data.statistics.subscriberCount;
        return (
          <SwiperSlide>
            <div className="recomSlide jcc aic">
              <div className="recomImg">
                <img src={data.snippet.thumbnails.high.url} />
              </div>
              <div className="recomInfo">
                <h2>{data.snippet.localized.title}</h2>
                <h3>{data.snippet.customUrl}</h3>
                <div className="channelInfo df jcc">
                  <p>
                    구독자 <span>{FormatLongNumber(numbers)}</span>
                  </p>
                  <p> · </p>
                  <p>영상{data.statistics.videoCount}개</p>
                </div>
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
  )
}

export default Healthslide