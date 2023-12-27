import React,{useState} from "react";
import "../styles/health.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";
import youtubeData from "../data/youtubeData.json";


function HealthSlide() {
  const url = "https://www.youtube.com/";
  return(

  <>
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
        const numbers = data.statistics.subscriberCount;
        function FormatLongNumber(numbers) {
          if(numbers == 0) {
            return 0;
          }
          else
          {
              // hundreds
              if(numbers <= 999){
                return numbers;
              }
              // thousands
              else if(numbers >= 1000 && numbers <= 999999){
                return (numbers / 1000) + 'K';
              }
              // millions
              else if(numbers >= 1000000 && numbers <= 999999999){
                return (numbers / 1000000) + 'M';
              }
              else
                return numbers;
          }
        }
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
                  <p>구독자 <span>{FormatLongNumber(numbers)}</span></p>
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
  </>
  )


}

export default HealthSlide()
