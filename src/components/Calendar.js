import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

const MyCalendar = ({ todoDates }) => {
  console.log(todoDates);
  const locale = "en";
  // const customWeekFormat = (locale, date) => {
  //   return new Intl.DateTimeFormat("en", { weekday: "short" }).format(date);
  // };
  // const customDayFormat = (locale, date) => {
  //   return new Intl.DateTimeFormat("en", { day: "numeric" }).format(date);
  // };

  return (
    <div>
      <Calendar value={todoDates} view="month" locale={locale} />
    </div>
  );
};

export default MyCalendar;
