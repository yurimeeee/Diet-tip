import React, { useEffect, useState } from "react";
import badSticker from '../asset/bad-sticker.png';
import goodsticker from '../asset/good-sticker.png';
import { useLocation } from 'react-router-dom';
import Weekly from "./Weekly";
import userJson from "../data/user.json";

const Today = () => {
  const location = useLocation();
  const [mainYN, setMainYn] = useState(true);
  const [wData, setWDate] = useState(null);
  const [icon, setIcon] = useState('');
  const [ht,setHt] = useState('');
  const [lt,setLt] = useState('');

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=37.5833&lon=127&appid=eaa34fc695456c14f8e7f8b0000a79c9&units=metric');
        const result = await response.json();
        setWDate(result);
        setIcon(result.weather[0].icon);
        setHt(result.main.temp_max);
        setLt(result.main.temp_min);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // 현재 page path 파악
    if (location.pathname === "/") {
      setMainYn(true);
      // console.log(mainYN);
      loadWeather();
    } else {
      setMainYn(false);
    }
  }, [location.pathname]); // location.pathname이 변경될 때마다 실행

  const [tmeal, setTmeal] = useState(null);
  const [texercise, setTexercise] = useState(null);

  useEffect(()=>{
    setTmeal(
      userJson.user1[1].today[0].meal === 'bad' ?  badSticker : goodsticker
    );
    setTexercise(
      userJson.user1[1].today[1].exercise === 'bad' ?  badSticker : goodsticker
    );
  },[]);



  return(
    <section className="Today">
      <div className='today'>
        <h5>오늘의</h5>
        <div className="today_content">
          {mainYN ? <Weekly/> : ''}
          <div className='today-cards'>
            {mainYN ? 
                <div className='today-card-big lg-radius'>
                    <h6>날씨</h6>
                    <div className="weather">
                      <div className="weather-text">
                        <p>최저<span>{lt}</span></p>
                        <p>최고<span>{ht}</span></p>
                      </div>
                      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='today weather icon' className='weather-icon'/>
                    </div>
                </div>
              : 
              ''}
            <div className='today-card lg-radius'>
              <h6>식단</h6>
              <img src={tmeal} alt='today meal sticker' className='sticker'/>
            </div>
            <div className='today-card lg-radius'>
              <h6>운동</h6>
              <img src={texercise} alt='today meal sticker' className='sticker'/>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
};

export default Today;