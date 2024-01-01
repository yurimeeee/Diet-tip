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
            <span>닉네임</span>
            <span className="w-green-btn">팔로우</span>
          </div>
          <div>
            <p>2024-01-01</p>
          </div>
        </div>
        <hr/>
        <div className="modalMainText">
          <h2>오늘은 어깨 운동하는 날!</h2>
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
        <button onClick={modalClose}>닫기</button>
      </div>
    </div>
  )
}

export default Healthmodal