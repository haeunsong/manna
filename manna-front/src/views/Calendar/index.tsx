// Calendar.tsx
import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import "./style.css";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const renderHeader = () => {
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            {"<"}
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, "yyyy년 M월")}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">{">"}</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days: React.ReactNode[] = [];
    const date = ["일", "월", "화", "수", "목", "금", "토"];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {date[i]}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows: React.ReactNode[] = [];
    let days: React.ReactNode[] = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day; //클릭 핸들러에 전달할 때 현재 날짜 객체를 클로저로 캡처
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart) // 현재 달의 날짜인지 확인
                ? "disabled"
                : isSameDay(day, selectedDate!) // 선택된 날짜인지 확인
                ? "selected"
                : ""
            }`}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      // 주 단위로 행 추가
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      );
      days = []; // 새로운 주를 위해 초기화
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
