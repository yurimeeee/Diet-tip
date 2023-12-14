import '../styles/mypage.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear } from '@fortawesome/free-solid-svg-icons'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import levelImg from "../asset/level-1-badge.png";
import profileImg from "../asset/profile-img.png";
import Today from '../components/Today';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, } from "chart.js";
import { Line } from 'react-chartjs-2';
import userJson from "../data/user.json";


const Mypage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userName, setUserName] = useState(null);
  const [usetImg, setUsetImg] = useState(null);

  const moveAlam = () => {
    window.location.replace('/alam');
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.displayName !== null){  
          setUserName(user.displayName);
        }else{
          setUserName(user.email);
        }
        setUsetImg(user.photoURL);
      } else {
        console.log('유저 정보 불러오기 실패');
        alert('먼저 로그인해주세요');
        window.location.replace('/login');
      }
    });
  });

  //chart.js
  const [label,setLabel] = useState([]);
  const [kg,setKg] = useState([]);
  const [health, setHealth] = useState([]);

  ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

  const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
          display: true,
          text: "2023년 12월",
      },
    },
  };

  useEffect(()=>{
    setLabel(userJson.user1[3].data.map((item)=>Object.keys(item)[0]));
    setKg(userJson.user1[3].data.flatMap(item => {
      const key = Object.keys(item)[0];
      const kgValues = item[key].filter(entry => entry.hasOwnProperty('kg')).map(entry => entry.kg);
      return kgValues.length ? kgValues : [undefined];
    }));
    setHealth(userJson.user1[3].data.flatMap(item => {
      const key = Object.keys(item)[0];
      const healthValues = item[key].filter(entry => entry.hasOwnProperty('health')).map(entry => entry.health);
      return healthValues.length ? healthValues : [undefined];
    }));
  },[])

  const data = {
    labels: label,
    datasets: [
      {
        label: '몸무게',
        data: kg,
        borderColor: "#32A061",
        backgroundColor: "#5AC479",
      }
    ],
  }

  const data2 = {
    labels: label,
    datasets: [
      {
        label: '운동',
        data: health,
        borderColor: "#F46B2A",
        backgroundColor: "#F47A3F",
      }
    ],
  }

  //data profile
  const [nowKG, setNowKg] = useState(null);
  const [until, setUntile] = useState(null);

  useEffect(()=>{
    setNowKg(userJson.user1[2].goal[2].nowKG);
    setUntile(userJson.user1[2].goal[1].until);
  },[]);

  //date

  // 특정 날짜 설정 (년, 월은 0부터 시작하므로 주의)
  const targetDate = new Date(2023, 11, 31);

  // 현재 날짜 가져오기
  const today = new Date();

  // 남은 일수 계산
  const timeDiff = targetDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return(
    <main className="Mypage container">
      <section className='profile mb-5'>
        <div className='area-middle'>
          <div className='area-middle-top'>
          <h5>{userName}님, 어서오세요.</h5>
            <div className='buttons'>
              <button type="button" className="button" onClick={moveAlam}>
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
                  <li>최근 운동 강도는 <span className='point-1'>{userJson.user1[0].profile[2].strength}</span></li>
                  <li>최근 운동 빈도는 <span className='point-2'>{userJson.user1[0].profile[3].frequency}</span></li>
                  <li>최근 식단 영양은 <span className='point-2'>{userJson.user1[0].profile[4].nutrition}</span></li>
                  <li>최근 식단 기록은 <span className='point-1'>{userJson.user1[0].profile[5].record}</span></li>
                </ul>
              </div>
            </figure>
            <section className='area-right'>
              {<Today/>}
              <div className='goal'>
                <h5>목표</h5>
                <div className='goal-card lg-radius'>
                  <p>체중<span className='gray-2'>{userJson.user1[2].goal[0].goalKG}kg</span></p>
                  <p>기간<span className='gray-2'>{until}</span>까지</p>
                </div>
                <div className='goal-card lg-radius'>
                  <p>현재<span className='gray-2'>{nowKG}kg</span></p>
                  <p>기간<span className='gray-2'>{daysRemaining}일</span>남았습니다</p>
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
      {/* <section className='user-meal'>
        <h5>나의 식단 기록</h5>
      </section> */}
      <section className='user-exercise center'>
        <h5>나의 운동 기록</h5>
        <div className='chart-container'>
          <Line
            data={data}
            options={options}
            width="400" height="100"
          />
          <button type='button' className='w-green-btn'>더보기</button>
        </div>
      </section>
      <section className='user-exercise'>
        <h5>나의 체중 기록</h5>
        <div className='chart-container'>
          <Line
            data={data2}
            options={options}
            width="400" height="100"
          />
          <button type='button' className='w-green-btn'>더보기</button>
        </div>
      </section>
    </main>
  )
};

export default Mypage;