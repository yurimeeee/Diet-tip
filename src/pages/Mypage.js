import '../styles/mypage.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear } from '@fortawesome/free-solid-svg-icons'
import { getAuth } from "firebase/auth";
import levelImg from "../asset/level-1-badge.png";
import profileImg from "../asset/profile-img.png";
import Today from '../components/Today';

const Mypage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userName, setUserName] = useState(null);
  const [usetImg, setUsetImg] = useState(null);

  useEffect(()=>{
    if (user !== null) {
      setUserName(user.displayName);
      setUsetImg(user.photoURL);
    }else{
      console.log('유저 정보 불러오기 실패');
    }
  }, [user]);

  

  return(
    <main className="Mypage container">
      <section className='profile'>
        <div className='area-middle'>
          <div className='area-middle-top'>
          <h5>{userName}님, 어서오세요.</h5>
            <div className='buttons'>
              <button type="button" className="button">
                <FontAwesomeIcon icon={faBell} className='icon'/>
              </button>
              <button type="button" className="button">
                <FontAwesomeIcon icon={faGear} className='icon'/>
              </button>
            </div>
          </div>
          <div className='area-middle-middle'>
            <figure className='profile-card lg-radius'>
              <img src={profileImg} className='profile-img md-radius' alt='profile img'/>
              <div className='about-user'>
                <div className='user-info'>
                  <h6 className='point-1 profile-name'>{userName}님</h6>
                  <img src={levelImg} className='level-badge'  alt='level badge'/>
                </div>
                <ul>
                  <li>최근 운동 강도는 <span className='point-1'>적당함</span></li>
                  <li>최근 운동 빈도는 <span className='point-2'>낮음</span></li>
                  <li>최근 식단 영양은 <span className='point-2'>고르지못함</span></li>
                  <li>최근 식단 기록은 <span className='point-1'>꾸준함</span></li>
                </ul>
              </div>
            </figure>
            <section className='area-right'>
              {<Today/>}
              <div className='goal'>
                <h5>목표</h5>
                <div className='goal-card lg-radius'>
                  <p>체중<span className='gray-2'>44kg</span></p>
                  <p>기간<span className='gray-2'>12월 31일</span>까지</p>
                </div>
                <div className='goal-card lg-radius'>
                  <p>현재<span className='gray-2'>52kg</span></p>
                  <p>기간<span className='gray-2'>37일</span>남았습니다</p>
                </div>
              </div>
              <div className='recommand'>
                <h5>나에게 맞는 추천</h5>
                <div className='recommand-btns'>
                  <button className='w-green-btn' type='button'>운동 보러가기</button>
                  <button className='w-green-btn' type='button'>식단 보러가기</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <section className='user-meal'>
        <h5>나의 식단 기록</h5>
      </section>
      <section className='user-exercise'>
        <h5>나의 운동 기록</h5>
      </section>
      <section className='user-exercise'>
        <h5>나의 체중 기록</h5>
      </section>
    </main>
  )
};

export default Mypage;