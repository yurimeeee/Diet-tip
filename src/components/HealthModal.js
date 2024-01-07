import React,{useState} from "react";
import "../styles/health.css";
import test from "../asset/health/testImg.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";


function Healthmodal(props){

  console.log(props.data)
  const modalClose = () => {
    props.parentSetModal(false);
  };

  return(
    <div className="healthModalBack">
      <div className="healthModal web-shadow df">
        <div className="modalImg">
          <div className="modalImg_1">
            <img src={props.data.photo} />
          </div>
        </div>
        <div className="modalText">
          <div className="df jcsb">
            <div className="text df">
              <span>
                <img src={test}/>
              </span>
              <p>{props.data.username}</p>
              <p className="w-green-btn">팔로우</p>
            </div>
            <div className="modalDays">
              <p>{props.data.createdAt}</p>
            </div>
          </div>
          <hr/>
          <div className="shotHeartIcon df">
              <span>
                <FontAwesomeIcon icon={regularHeart}/>
              </span>
              <h3>{props.data.like}</h3>
            </div>
          <div className="modalMainText">
            <p>{props.data.text}</p>
          </div>
          <ul className="shotTags df">
            {props.data.hashTags.map((item)=>(
             <li className="m-badge"><span>#{item}</span></li>
            ))}
          </ul>
          {/* <div className="modalImg_2 df jcsb ">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg" />
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg" />
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg" />
          </div> */}
          <div className="modalBtn" onClick={modalClose}></div>
        </div>
      </div>
    </div>
  )
}

export default Healthmodal