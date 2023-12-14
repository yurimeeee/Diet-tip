import React from "react";
import "../styles/health.css";
import testImg from "../asset/health/testImg.png"

function LevelCont() {
    return (
        <div className="LevelCont container df">
            <div className="levelContWrap">
                <img src={testImg} alt=""/>
                <p>테스트</p>
                <p>테스트테스트테스트</p>
            </div>
            <div className="levelContWrap">
                <img src={testImg} alt=""/>
                <p>테스트</p>
                <p>테스트테스트테스트</p>
            </div>
            <div className="levelContWrap">
                <img src={testImg} alt=""/>
                <p>테스트</p>
                <p>테스트테스트테스트</p>
            </div>
        </div>
    )
}

export default LevelCont

