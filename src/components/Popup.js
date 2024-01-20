import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import styled from "styled-components";
import logo from "../asset/logo.png";
import { Link } from "react-router-dom";

const point1 = '#32a061';
const fontBold = 'font-weight: bold';

const PopupBox = styled.dialog`
  display: block;
  position: fixed;
  z-index: 10000;
  top: 7%;
  left: 10%;
  background: #fff;
  border-radius: 20px;
  border: 2px solid ${point1};
  box-sizing: border-box;
  margin: 0;
  padding: 48px 24px;

  .part-2,
  .part-3,
  .part-4 {
    line-height: 1.7;

    a{
      color: ${point1};

      &:hover{
        ${fontBold}
      }
    }

    b{
      ${fontBold}
    }
  }

  .part-1 {
    h2{
      margin: 0 auto 24px;
      width: 30%;
    }

    img{
      width: 100%;
    }

    p{
      font-size: 20px;
      line-height: 1.3;
      ${fontBold}
    }
  }

  .part-2 {
    .code svg{
      fill: ${point1};
    }
  }

  .part-3 {
    :first-child{
      margin-bottom: 6px;
    }
  }

  .part-4 {
    label,
    #daycheck{
      cursor: pointer;
    }
    #daycheck{
      width: 16px;
      height: 16px;
      border: 1px solid #495057;
      border-radius: 3px;
      margin: 0 0 -3px 8px;

      &:focus{
        border: 1px solid ${point1};
        box-shadow: 0px 0px 0px 5px rgba(148, 223, 182, 0.35);
      }

      &:checked{
        border: 1px solid ${point1};
        background: ${point1};
        background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2357 2.73289C11.3039 2.65915 11.3854 2.60058 11.4753 2.56059C11.5652 2.5206 11.6617 2.5 11.7592 2.5C11.8567 2.5 11.9532 2.5206 12.0431 2.56059C12.133 2.60058 12.2145 2.65915 12.2827 2.73289C12.5687 3.03891 12.5727 3.53341 12.2927 3.84473L6.37959 11.2464C6.31246 11.3245 6.23099 11.3872 6.14017 11.4308C6.04934 11.4744 5.95108 11.4979 5.85139 11.4999C5.75169 11.5018 5.65267 11.4823 5.56037 11.4423C5.46806 11.4024 5.38443 11.3429 5.31457 11.2676L1.7165 7.40686C1.57773 7.25701 1.5 7.05552 1.5 6.84565C1.5 6.63578 1.57773 6.43428 1.7165 6.28443C1.78474 6.2107 1.8662 6.15212 1.95609 6.11213C2.04598 6.07214 2.1425 6.05154 2.24001 6.05154C2.33751 6.05154 2.43403 6.07214 2.52392 6.11213C2.61382 6.15212 2.69527 6.2107 2.76352 6.28443L5.81558 9.5596L11.2157 2.75618L11.2357 2.73289Z' fill='white'/%3E%3C/svg%3E%0A");
      }
    }
  }

  hr{
    margin: 12px 0;
  }

  //mobile size
  @media (max-width: 480px) {
    width: 335px;
    top: 2.5%;
    left: 5%;
    padding: 30px 20px;

    .part-2,
    .part-3,
    .part-4{
      font-size: 14px;
    }

    .part-1{
      p{
        font-size: 16px;
      }
    }

    .part-2{
      p:last-child{
        word-break: keep-all;
      }
      span{
        display: block;
        text-indent: 34px;
      }
    }

    hr{
      margin: 8px 0;
    }
  }
`

const Popup = () => {
  const [ isPopup, setIsPopup ] = useState(false);
  const [ Checked, setChecked ] = useState(false);
  const [ cookies, setCookie ] = useCookies(['Diet-tip']);

  const handleCheckboxChange = () => {
    setChecked(!Checked);
  };
  
  const timeToMidnight = () => {
    const expiration = new Date();
    const midnight = new Date(expiration);
    midnight.setHours(24, 0, 0, 0); //쿠키가 생성된 시점의 자정에 만료
    return midnight;
  };

  const closePopup = () => {
    if(Checked){
      const expiration = timeToMidnight();
      setCookie('Diet-tip', true, {expires:expiration});
    }
    setIsPopup(false);
  }

  useEffect(() => {
    const checkCookie = () => {
      const isCookieSet = cookies['Diet-tip'];

      //쿠키가 있다면, pupup이 보이지 않고 없다면 popup이 보이게
      if(!isCookieSet){
        setIsPopup(true);
      }
    };

    checkCookie();
  }, []);

  if (isPopup) {
    return (
      <PopupBox>
        <div className="part-1">
          <h2 className="point-1"><img src={logo} alt="다이어팁" /></h2>
          <p>본 사이트는 구직용 포트폴리오 웹사이트이며,<br/>
            실제로 운영되는 사이트가 아닙니다.</p>
        </div>
        <hr/>
        <div className="part-2">
          <p><b>제작기간</b> : 2023.11.07 ~ 2024.01.13</p>
          <p><b>기획 및 디자인</b> :
            <Link target="_blank" to="https://www.figma.com/file/elnXUa0RLvAtaT19DbnMdJ/%EC%8A%A4%ED%84%B0%EB%94%94?type=design&node-id=1%3A5&mode=design&t=QdTBnaJwBhKBF7T8-1"> 피그마</Link>
          </p>
          <p className="code df aic"><b>코드&nbsp;</b>:&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
            </svg>
            <Link target="_blank" to="https://github.com/yurimeeee/Diet-tip">&nbsp;깃허브</Link>
          </p>
          <p><b>개발환경</b> : react, node.js, scss</p>
          <p><b>특징</b> : react를 기반으로 api, scss, firebase를 <span>활용한 사이트 구현</span></p>
        </div>
        <hr/>
        <div className="part-3">
          <p><b>팀 GoodJob</b> : 김유림, 박혜인, 이은서, 천혜영</p>
          <p><b>- 구현 완료 페이지 -</b></p>
          <p><b>김유림</b> :
            <Link to="/meal"> 식단 공유</Link> |
            <Link to="/calories"> 칼로리 사전</Link>
          </p>
          <p><b>박혜인</b> :
            <Link to="/health"> 운동 추천</Link> |
            <Link to="/healthshot"> 운동 인증</Link>
          </p>
          <p><b>이은서</b> :
            <Link to="/"> 메인</Link> |
            <Link to="/mypage"> 마이페이지</Link> |
            <Link to="/alert"> 알림</Link> |
            <Link to="/login"> 로그인/회원가입</Link>
          </p>
          <p><b>천혜영</b> :
            <Link to="/freeboard"> 자유게시판</Link> |
            <Link to="/qnaboard"> Q&A</Link>
          </p>
        </div>
        <hr/>
        <div className="part-4 df aic jcsb">
          <div>
            <label>오늘 하루 보지 않기
              <input 
                type="checkbox" 
                id="daycheck"
                checked={Checked}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          <button className="w-green-btn" onClick={closePopup}>닫기</button>
        </div>
      </PopupBox>
    );
  }

  return null;
};

export default Popup;