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
    <>
    <div className="healthModal" >
      <div className="modalText df jcsb">
        <div className="text df">
          <span>
            <img src={test}/>
          </span>
          <p>{props.data.username}</p>
          <span className="w-green-btn">팔로우</span>
        </div>
        <div className="modalDays">
          <p>{props.data.createdAt}</p>
        </div>
      </div>
      <hr/>
      <div className="modalImg">
        <img src={props.data.photo} />
      </div>
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
      <div className="modalBtn" onClick={modalClose}></div>
    </div>
    <div className="healthModalBack" onClick={modalClose}></div>
    </>
  )
}

export default Healthmodal