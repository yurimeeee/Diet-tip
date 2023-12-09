import React, { useState } from "react";
import level1Img from "../asset/level-1-badge.png";
import level2Img from "../asset/level-2-badge.png";
import level3Img from "../asset/level-3-badge.png";
import { Testing, Teststart }  from "./Test";


const Banner = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [testing, setTesting] = useState(false);
  const [modalSwitch, setModalSwitch] = useState(false);

  const handleTestingYN = (testState) => {
    setTestStarted(!testState);
    setTesting(testState);
    console.log('테스트 시작');
  }

  //모달 열기
  const openModal = (e)=>{
    let data = e.target.getAttribute('data-modal');
    let modal = document.querySelector(`${data}`);
    modal.setAttribute('open', 'open');
    let ost = modal.offsetTop - 300;
    window.scrollTo({ top: ost, behavior: 'smooth' });
    setModalSwitch(true);
    setTestStarted(true);
  }

  //모달 닫기
  const closeModal = (e)=>{
    let data = e.target.getAttribute('data-modal');
    let modal = document.querySelector(data);
    modal.removeAttribute("open");
    setModalSwitch(false);
    setTestStarted(false);
  }

  //modalOff 클릭시 모든 모달 닫기
  const closeAll = (e)=>{
    let modal =  document.querySelectorAll('.modal');
    modal.forEach(function(item){
      item.removeAttribute("open");
    })
    setModalSwitch(false);
  }

  return(
    <>
      <section className="banner">
        <div className="banner-text">
          <p>다이어팁에 처음 왔다면</p>
          <p>내 <span>관리레벨 테스트하고</span> 예쁜 <span>레벨 뱃지</span> 받자!</p>
          <button className="w-green-btn" type="button" data-modal="#modal1" onClick={openModal}>테스트 시작하기</button>
        </div>
        <div className="banner-img">
          <img src={level1Img} className="level-badge" alt="level badge"></img>
          <img src={level2Img} className="level-badge" alt="level badge"></img>
          <img src={level3Img} className="level-badge" alt="level badge"></img>
        </div>
      </section>
      <dialog className="modal" id="modal1">
        <div className="modal-container">
        <button type="button" className="modal-close-btn" data-modal="#modal1" onClick={closeModal}></button>
          {testStarted ? <Teststart testing={handleTestingYN}/> : ''}
          {testing ? <Testing/> : ''}
        </div>
      </dialog>
      <div
        className="modal-off"
        style={{display: modalSwitch ? "block":"none", opacity: modalSwitch ? "1":"0"}}
        onClick={closeAll}
      >
      </div>
    </>
  )
}

export default Banner;