// Calendar.tsx
import React, { useState, useEffect } from "react";
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
import { getEventByDateRequest } from "apis";
import Event from "types/interface/event.interface";
import { GetEventByDateResponseDto } from "apis/response/event";
import ResponseDto from "apis/response";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // 첫 화면이 오늘의 날짜 이도록 설정
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsByDate, setEventsByDate] = useState<Map<string, Event[]>>(
    new Map()
  ); // 이벤트가 있는 날짜를 추적하는 Map 객체.

  // 모든 일정 불러오기
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      getEventByDateRequest(formattedDate).then(getEventByDateResponse);
    }
  }, [selectedDate]);

  // 일정이 존재하는 날짜에 초록색 점 표시하기
  useEffect(() => {
    if (currentMonth) {
      // 여기에 현재 월의 모든 날짜를 API 에 요청하여 이벤트 데이터를 가져온다.
      const startDate = startOfMonth(currentMonth);
      const endDate = endOfMonth(currentMonth);
      const dateRange: any[] = [];
      let day = startDate;

      // 현재 월의 모든 날짜를 배열에 추가한다.
      while (day <= endDate) {
        dateRange.push(format(day, "yyyy-MM-dd")); // 날짜를 문자열 형식으로 변환하여 배열에 추가한다.
        day = addDays(day, 1); // 다음 날짜로 이동
      }

      // dateRange : 현재 달의 모든 날짜가 들어있음.
      Promise.all(dateRange.map((date) => getEventByDateRequest(date))).then(
        (response) => {
          console.log("response: ", response);
          // 날짜와 이벤트 목록을 매핑할 Map 객체 생성
          const dateMap = new Map<string, Event[]>();
          // 응답 데이터를 날짜와 매핑하여 Map 에 저장
          response.forEach((response, index) => {
            const date = dateRange[index];
            dateMap.set(date, response);
          });
          console.log("dateMap", dateMap);
          setEventsByDate(dateMap);
        }
      );
    }
  }, [currentMonth]);
  const getEventByDateResponse = (
    responseBody: GetEventByDateResponseDto[]
  ) => {
    if (!responseBody) return;
    console.log("getEventByDateResponse ResponseBody: ", responseBody);
    const events: Event[] = responseBody.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      date: item.date,
    }));

    setEvents(events);
  };
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
        formattedDate = format(day, "yyyy-MM-dd");
        const cloneDay = day;
        const events = eventsByDate.get(formattedDate) || [];

        days.push(
          <div
            className={`w-12 h-12 flex items-center justify-center cursor-pointer relative ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400"
                : isSameDay(day, selectedDate!)
                ? "bg-blue-500 text-white rounded-full"
                : ""
            }`}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            {format(day, "d")}
            {/* 일정이 있으면 초록색 점 추가 */}
            {events.length > 0 && (
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const renderEvents = () => {
    if (events.length === 0) {
      return <div className="text-center text-gray-500">일정이 없습니다.</div>;
    }
    return (
      /* space-x-4 : 간격
      
      */
      <div className="mt-6 flex space-x-4 py-4 px-2">
        {events.map((event) => (
          <div
            className="flex-none w-60 p-4 bg-white shadow-lg rounded-lg"
            key={event.id}
          >
            <div className="font-semibold text-lg mb-2">{event.title}</div>
            <div className="text-sm text-gray-600 mb-2">
              {event.description}
            </div>
            <div className="text-xs text-gray-400">{event.date}</div>
          </div>
        ))}
      </div>
    );
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
    <div className="calendar p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {selectedDate && (
        <div className="mt-14">
          <h2 className="mt-5 text-xl font-bold mb-2">
            {format(selectedDate, "yyyy년 M월 d일")}의 일정
          </h2>
          {renderEvents()}
        </div>
      )}
    </div>
  );
}
