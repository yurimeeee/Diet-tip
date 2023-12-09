import React, { useState } from "react";
import leveltestImg from "../asset/level-test-sticker.png"

const Teststart = (props) => {
  const [istesting, setisTesting] = useState(false);
  const handleTesting = () => {
    props.testing(true);
  }

  return(
    <>
      <h5>관리레벨 테스트</h5>
      <img alt="level test icon" src={leveltestImg} className="level-test-img"></img>
      <p>나는 내 몸과 건강을 얼마나 잘 관리하고 있을까?</p>
      <button className="w-green-btn" type="button" onClick={handleTesting}>테스트 시작하기</button>
    </>
  )
}

const Testing = () => {
  return(
    <>
      <h5>Q.1</h5>
      <p>극단적인 다이어트 방법을</p>
      <div className="answer-btns">
        <button className="w-green-btn" type="button">시도했고 유지중이다</button>
        <button className="w-green-btn" type="button">시도했고 유지중이다</button>
        <button className="w-green-btn" type="button">시도했고 유지중이다</button>
        <button className="w-green-btn" type="button">시도했고 유지중이다</button>
      </div>
      <div id="progress">
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </>
  )
}
export {Teststart, Testing};