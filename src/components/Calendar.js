import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = ({ todoDates }) => {
  console.log(todoDates);
  const locale = "en";
  return (
    <div>
      <Calendar value={todoDates} view="month" locale={locale} />
    </div>
  );
};

export default MyCalendar;
