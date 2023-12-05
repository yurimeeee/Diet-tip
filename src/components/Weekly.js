import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Weekly = ({ todoDate }) => {
  const [now, setNow] = useState(new Date());
  const today = now.getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [dayList, setDayList] = useState([]);
  // const [showMonthlyCalendar, setShowMonthlyCalendar] = useState(false);

  // const toggleMonthlyCalendar = () => {
  //   setShowMonthlyCalendar(!showMonthlyCalendar);
  // };

  // 현재 주의 월요일을 계산하는 함수
  const calculateStartOfWeek = () => {
    const currentDayOfWeek = now.getDay(); // 현재 요일 (0: 일요일, 1: 월요일, ...)
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

  // 이전 주를 표시하도록 데이터 업데이트 함수
  const showPreviousWeek = () => {
    // now 변수를 업데이트
    const newNow = new Date(now);
    newNow.setDate(newNow.getDate() - 7);
    setNow(newNow);
  };

  // 다음 주를 표시하도록 데이터 업데이트 함수
  const showNextWeek = () => {
    // now 변수를 업데이트
    const newNow = new Date(now);
    newNow.setDate(newNow.getDate() + 7);
    setNow(newNow);
  };
  return (
    <div className="Calendar df jcsb ">
      <div className="Year-MonthList">
        <p>
          <span className="Year">{now.getFullYear()}</span>
          &nbsp;&nbsp;
          <span className="Month">
            {/* {now.toLocaleString("en-us", { month: "long" })} */}
            {now.getMonth() + 1}월
          </span>
        </p>
        <h2 className="sec-tt">Weekly Best</h2>
      </div>
      <div className="DayList">
        <div className="weekly-wrap">
          {dayList.map((day, index) => (
            <div
              className={`daylist ${day === today ? "today" : ""}`}
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
          ))}
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
