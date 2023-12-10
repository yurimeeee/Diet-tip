import React, { useEffect, useRef, useState } from "react";
import leveltestImg from "../asset/level-test-sticker.png"
import { qnaList, result } from "../data/test_data";
import level1Img from "../asset/level-1-badge.png";
import level2Img from "../asset/level-2-badge.png";
import level3Img from "../asset/level-3-badge.png";
import resultImg1 from "../asset/test/result-level1.png";
import resultImg2 from "../asset/test/result-level2.png";
import resultImg3 from "../asset/test/result-level3.png";
import Kakao from "https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js";
window.Kakao.init("b20a514da7c33c650ca0a06403dad918");

const Banner = () => {
  const [modalSwitch, setModalSwitch] = useState(false);
  const [started, setStarted] = useState(false);
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(false);
  const startP = useRef(null);
  const testingP = useRef(null);
  const [qidx, setqidx] = useState(0);
  const [next, setNext] = useState(0);
  const qAmt = qnaList.length;
  const [score, setScore] = useState(0);
  const [fscore, setFScore] = useState(0);
  const btns = useRef(null);
  const pBar = useRef(null);
  
  console.log('스코어'+score);
  console.log('qidx'+qidx);


  //모달 열기
  const openModal = (e)=>{
    let data = e.target.getAttribute('data-modal');
    let modal = document.querySelector(`${data}`);
    modal.setAttribute('open', 'open');
    let ost = modal.offsetTop - 300;
    window.scrollTo({ top: ost, behavior: 'smooth' });
    setModalSwitch(true);

    setStarted(true);
    setTesting(false);
    setResult(false);
  }

  //모달 닫기
  const closeModal = (e)=>{
    let data = e.target.getAttribute('data-modal');
    let modal = document.querySelector(data);
    modal.removeAttribute("open");
    setModalSwitch(false);
    setStarted(false);
    setTesting(false);
    setResult(false);
    setqidx(0);
    setNext(0);
  }

  //modalOff 클릭시 모든 모달 닫기
  const closeAll = (e)=>{
    let modal =  document.querySelectorAll('.modal');
    modal.forEach(function(item){
      item.removeAttribute("open");
    })
    setModalSwitch(false);
    setStarted(false);
    setTesting(false);
    setResult(false);
    setqidx(0);
    setNext(0);
  }

  const startTest = () => {
    setStarted(false);
    setTesting(true);
    setResult(false);
    goNext(0);
  }

  //테스트 과정
  const goNext = (qidx) => {
    if(qidx === qAmt){
      goResult();
    }else{
      setqidx(next);
      setNext(qidx+1);
    }
  };

  const addAnswer = (scorePoint) => {
    setScore(score + scorePoint);
    goNext(qidx+1);
  }

  const goResult = () => {
    if(score > 10){
      setFScore(resultImg3);
    }else if(score > 5){
      setFScore(resultImg2);
    }else{
      setFScore(resultImg1);
    }
    setStarted(false);
    setTesting(false);
    setResult(true);
  }
  

  const shareMessage = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '다이어팁 관리 레벨',
        description: '친구의 관리 레벨을 확인하고 나도 테스트 해보자!',
        imageUrl: fscore,
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      }
    });
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
          {started ?
            <div className="test-start">
              <h5>관리레벨 테스트</h5>
              <img alt="level test icon" src={leveltestImg} className="level-test-img"></img>
              <p>나는 내 몸과 건강을 얼마나 잘 관리하고 있을까?</p>
              <button className="w-green-btn" type="button" onClick={startTest}>테스트 시작하기</button>
            </div>
            :
            ''
          }
          {testing ?
            <div className="test-testing">
              <h5>Q.{qidx+1}</h5>
              <p>{qnaList[qidx].q}</p>
              <div className="answer-btns" ref={btns}>
                {qnaList[qidx].a.map((answerText, idx) => (
                  <button key={idx} className="w-green-btn" score={answerText.score} type="button" onClick={() => addAnswer(answerText.score)}>
                    {answerText.answer}
                  </button>
                ))}
              </div>
              <div id="progress">
                <div className="progress">
                  <div className="progress-bar" ref={pBar} style={{ width: `${(100 / qnaList.length) * qidx}%` }}></div>
                </div>
              </div>
            </div>
            :
            ''
          }
          {result ?
            <div className="test-result">
              <img src={fscore} alt="test result img" className="result-img"></img>
              <button type="button" className="w-green-btn" id="kakaotalk-sharing-btn" onClick={shareMessage}>카카오톡 공유하기</button>
            </div>
            :
            ''
          }

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