import React, { useEffect, useRef, useState } from "react";
import leveltestImg from "../asset/level-test-sticker.png";
import { qnaList, result } from "../data/test_data";
import resultImg1 from "../asset/test/result-level1.png";
import resultImg2 from "../asset/test/result-level2.png";
import resultImg3 from "../asset/test/result-level3.png";
import B0 from "../asset/main-banner/banner-img0.png";
import B1 from "../asset/main-banner/banner-img1.png";
import B2 from "../asset/main-banner/banner-img2.png";
import bannerText from "../data/banner_data";
// import Kakao from "https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js";

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
  const pBar = useRef(null);
  const [init, setInit] = useState(false);
  const slides = [B0, B1, B2];
  const [currentSlide, setCurrentSlide] = useState(0);
  const banner = useRef(null);
  const bannerBtn = useRef(null);
  let btns = document.querySelectorAll(".banner-control");

  //모달 열기
  const openModal = (e) => {
    let data = e.target.getAttribute("data-modal");
    let modal = document.querySelector(`${data}`);
    modal.setAttribute("open", "open");
    let ost = modal.offsetTop - 300;
    window.scrollTo({ top: ost, behavior: "smooth" });
    setModalSwitch(true);

    setStarted(true);
    setTesting(false);
    setResult(false);
  };

  //모달 닫기
  const closeModal = (e) => {
    let data = e.target.getAttribute("data-modal");
    let modal = document.querySelector(data);
    modal.removeAttribute("open");
    setModalSwitch(false);
    setStarted(false);
    setTesting(false);
    setResult(false);
    setqidx(0);
    setNext(0);
  };

  //modalOff 클릭시 모든 모달 닫기
  const closeAll = (e) => {
    let modal = document.querySelectorAll(".modal");
    modal.forEach(function (item) {
      item.removeAttribute("open");
    });
    setModalSwitch(false);
    setStarted(false);
    setTesting(false);
    setResult(false);
    setqidx(0);
    setNext(0);
  };

  const startTest = () => {
    setStarted(false);
    setTesting(true);
    setResult(false);
    goNext(0);
  };

  //테스트 과정
  const goNext = (qidx) => {
    if (qidx === qAmt) {
      goResult();
    } else {
      setqidx(next);
      setNext(qidx + 1);
    }
  };

  const addAnswer = (scorePoint) => {
    setScore(score + scorePoint);
    goNext(qidx + 1);
  };

  const goResult = () => {
    if (score > 10) {
      setFScore(resultImg3);
    } else if (score > 5) {
      setFScore(resultImg2);
    } else {
      setFScore(resultImg1);
    }
    setStarted(false);
    setTesting(false);
    setResult(true);
  };

  useEffect(() => {
    if (!init && window.Kakao) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_SHARE_API_KEY);
      setInit(true);
      console.log(init);
    }
  });

  //카카오톡 공유하기
  const shareMessage = () => {
    //   console.log(init);
    // window.Kakao.Share.sendDefault({
    //   objectType: "feed",
    //   content: {
    //     title: "다이어팁 관리 레벨",
    //     description: "친구의 관리 레벨을 확인하고 나도 테스트 해보자!",
    //     imageUrl: fscore,
    //     link: {
    //       // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
    //       mobileWebUrl: "https://developers.kakao.com",
    //       webUrl: "https://developers.kakao.com",
    //     },
    //   },
    // });
  };

  const [testYN, setTestYN] = useState(false);

  //배너 오토 슬라이드
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    document.querySelectorAll(".banner-control").forEach((control) => {
      control.classList.remove("active");
    });
    document
      .querySelectorAll(".banner-control")
      [currentSlide].classList.add("active");
    banner.current.style.backgroundColor = bannerText[currentSlide].bcolor;
    bannerBtn.current.classList.remove("w-red-btn");
    bannerBtn.current.classList.remove("w-green-btn");
    bannerBtn.current.classList.add(bannerText[currentSlide].btncolor);
    if (currentSlide === 2) {
      setTestYN(true);
    } else {
      setTestYN(false);
    }
  }, [currentSlide]);

  const handleButtonClick = (e, idx) => {
    document.querySelectorAll(".banner-control").forEach((control) => {
      control.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    setCurrentSlide(idx);
  };

  return (
    <>
      <section className="banner" ref={banner}>
        <div className="banner-text">
          <p>{bannerText[currentSlide].sp}</p>
          <p
            dangerouslySetInnerHTML={{ __html: bannerText[currentSlide].bp }}
            className="ptag"
          ></p>
          <button
            className="w-green-btn"
            type="button"
            data-modal="#modal1"
            ref={bannerBtn}
            onClick={testYN ? openModal : null}
          >
            {bannerText[currentSlide].btn}
          </button>
        </div>
        <div className="banner-img">
          <img src={slides[currentSlide]} alt="banner img"></img>
        </div>
        <div className="banner-cotntrols">
          {bannerText.map((item, idx) => (
            <button
              className="banner-control"
              key={idx}
              data-idx={idx}
              onClick={(e) => handleButtonClick(e, idx)}
            ></button>
          ))}
        </div>
      </section>
      <dialog className="modal" id="modal1">
        <div className="modal-container">
          <button
            type="button"
            className="modal-close-btn"
            data-modal="#modal1"
            onClick={closeModal}
          ></button>
          {started ? (
            <div className="test-start">
              <h5>관리레벨 테스트</h5>
              <img
                alt="level test icon"
                src={leveltestImg}
                className="level-test-img"
              ></img>
              <p>나는 내 몸과 건강을 얼마나 잘 관리하고 있을까?</p>
              <button className="w-green-btn" type="button" onClick={startTest}>
                테스트 시작하기
              </button>
            </div>
          ) : (
            ""
          )}
          {testing ? (
            <div className="test-testing">
              <h5>Q.{qidx + 1}</h5>
              <p>{qnaList[qidx].q}</p>
              <div className="answer-btns">
                {qnaList[qidx].a.map((answerText, idx) => (
                  <button
                    key={idx}
                    className="w-green-btn"
                    score={answerText.score}
                    type="button"
                    onClick={() => addAnswer(answerText.score)}
                  >
                    {answerText.answer}
                  </button>
                ))}
              </div>
              <div id="progress">
                <div className="progress">
                  <div
                    className="progress-bar"
                    ref={pBar}
                    style={{ width: `${(100 / qnaList.length) * qidx}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {result ? (
            <div className="test-result">
              <img
                src={fscore}
                alt="test result img"
                className="result-img"
              ></img>
              <button
                type="button"
                className="w-green-btn"
                id="kakaotalk-sharing-btn"
              >
                카카오톡 공유하기
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </dialog>
      <div
        className="modal-off"
        style={{
          display: modalSwitch ? "block" : "none",
          opacity: modalSwitch ? "1" : "0",
        }}
        onClick={closeAll}
      ></div>
    </>
  );
};

export default Banner;
