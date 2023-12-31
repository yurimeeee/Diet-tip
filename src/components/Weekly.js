import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from 'react-router-dom';
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Weekly = ({ todoDate }) => {
  const [now, setNow] = useState(new Date());
  const today = now.getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const location = useLocation();
  const [mainYN, setMainYn] = useState(true);

  const [dayList, setDayList] = useState([]);

  // 현재 주의 월요일을 계산하는 함수
  const calculateStartOfWeek = () => {
    const currentDayOfWeek = now.getDay(); // 현재 요일
    const daysUntilMonday = (currentDayOfWeek + 6) % 7; // 월요일까지 남은 일 수
    const startDate = new Date(now);
    startDate.setDate(today - daysUntilMonday); // 현재 날짜에서 월요일까지의 날 수를 빼서 월요일의 날짜를 계산

    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(startDate.getDate());
      startDate.setDate(startDate.getDate() + 1);
    }
    setDayList(dates);
  };

  useEffect(() => {
    calculateStartOfWeek();
  }, [now]);

  //현재 page path 파악
  useEffect(()=>{
    if (location.pathname === "/") {
      setMainYn(true);
      // console.log(mainYN);
    } else {
      setMainYn(false);
    }
  },[location.pathname])

  const updateWeek = (increment) => {
    const newNow = new Date(now);
    newNow.setDate(newNow.getDate() + increment * 7);
    setNow(newNow);
  };

  const showPreviousWeek = () => {
    updateWeek(-1);
  };

  const showNextWeek = () => {
    updateWeek(1);
  };

  // 오늘 날짜 표기
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={mainYN ? 'Calendar': 'Calendar df jcsb'}>
      <div className="Year-MonthList">
        <p>
          <span className="Year">{now.getFullYear()}{mainYN ? '년': ''}</span>
          &nbsp;&nbsp;
          <span className="Month">
            {/* {now.toLocaleString("en-us", { month: "long" })} */}
            {now.getMonth() + 1}월
          </span>
        </p>
      </div>
      <div className="DayList">
        <div className="weekly-wrap">
          {dayList.map((day, index) => {
            const currentDate = new Date(
              now.getFullYear(),
              now.getMonth(),
              day
            );
            const isTodayDate = isToday(currentDate);

            return (
              <div
                className={`daylist ${isTodayDate ? "today" : ""}`}
                key={index}
              >
                <div
                  className={`weak ${
                    daysOfWeek[index] === "Sun"
                      ? "Sun"
                      : daysOfWeek[index] === "Sat"
                      ? "Sat"
                      : ""
                  }`}
                >
                  {daysOfWeek[index]}
                </div>
                <div className="day">{day}</div>
              </div>
            );
          })}

          <div className="week-btns">
            <button onClick={showPreviousWeek} className="prev">
              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
            </button>
            <button onClick={showNextWeek} className="next">
              <FontAwesomeIcon icon={faChevronRight} size="lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weekly;
