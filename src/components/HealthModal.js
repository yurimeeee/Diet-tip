import React,{useState} from "react";
import "../styles/health.css";
import test from "../asset/health/testImg.png"
function Healthmodal(props){

  const modalClose = () => {
    props.parentSetModal(false);
  };

  return(
    <div className="modal web-shadow df">
      <div className="modalImg">
        <div className="modalImg_1">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg" />
        </div>
      </div>
      <div className="modalText">
        <div className="df jcsb">
          <div className="text df">
            <span>
              <img src={test}/>
            </span>
            <p>닉네임</p>
            <p className="w-green-btn">팔로우</p>
          </div>
          <div className="modalDays">
            <p>2024-01-01</p>
          </div>
        </div>
        <hr/>
        <div className="modalMainText">
          <p>2023년 최고 흥행작에 등극한 영화 '서울의 봄'이 새해 첫날 누적 관객 수 1천200만명을 넘어섰다.
          1일 배급사 플러스엠 엔터테인먼트에 따르면 '서울의 봄'의 누적 관객 수는 이날 1천200만명을 돌파했다.
          역대 천만 영화 중 '해운대'(2009·1천145만명)와 '부산행'(2016·1천156만명)의 최종 기록을 일찌감치 뛰어넘고 '태극기 휘날리며'(2004·1천174만명)도 제쳤다.
          </p>
        </div>
        <ul className="df">
          <li className="m-badge"><span>#오운완</span></li>
          <li className="m-badge"><span>#어깨운동</span></li>
          <li className="m-badge"><span>#어깨예뻐지기</span></li>
				</ul>
        <div className="modalImg_2 df jcsb ">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg" />
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg" />
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg" />
        </div>


        <div className="modalBtn" onClick={modalClose}></div>

      </div>
    </div>
  )
}

export default Healthmodal