import React, { useEffect, useState } from "react";
import "../styles/health.css";
import testImg2 from "../asset/health/testImg2.png";


const recom = [
    {
      "img":testImg2,
      "title":"힙으뜸 @euddeume",
      "subtitle":"구독자 159만명‧동영상 538개"
    },
]

const HealthSlide = () => {
  return(
    recom.map((data) => (
        <div className="jcc aic">    
            <img src={data.img} className="recomImg"/>
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>
          <div className="df jcc">
            <button type="button" className="w-green-btn">구독하기</button>
            <button type="button" className="w-red-btn">영상보기</button>
          </div>
        </div>
    ))
  )}

export default HealthSlide

