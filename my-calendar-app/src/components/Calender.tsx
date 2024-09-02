import React, { useState, useEffect } from "react";
import moment from "jalali-moment";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Day from "./Day";
import EventModal from "./EventModal";

const persianMonths: Record<string, string> = {
  farvardin: "فروردین",
  ordibehesht: "اردیبهشت",
  khordad: "خرداد",
  tir: "تیر",
  mordad: "مرداد",
  shahrivar: "شهریور",
  mehr: "مهر",
  aban: "آبان",
  azar: "آذر",
  dey: "دی",
  bahman: "بهمن",
  esfand: "اسفند",
};

const officialHolidays = ["2024-03-21", "2024-03-22"];
const convertToPersianNumbers = (num: number | string) => {
  const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
  return num
    .toString()
    .replace(/\d/g, (match) => persianNumbers[parseInt(match, 10)]);
};

const Calendar: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const daysInMonth = currentMonth.jDaysInMonth();

  const monthName = currentMonth
    .format("jMMMM")
    .toLowerCase() as keyof typeof persianMonths;

  const formattedMonth = `${persianMonths[monthName]} ${convertToPersianNumbers(
    currentMonth.format("jYYYY")
  )}`;

  const today = moment().format("YYYY-MM-DD");
  useEffect(() => {
    const eventsFromStorage = localStorage.getItem("events");
    if (eventsFromStorage) {
      const parsedEvents = JSON.parse(eventsFromStorage);
      const todayEvents = parsedEvents.filter(
        (event: { date: string }) => event.date === today
      );
      if (todayEvents.length > 0) {
        alert(
          `رویدادهای روز جاری: ${todayEvents
            .map((e: { description: string }) => e.description)
            .join(", ")}`
        );
      }
    }
  }, [today]);
  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentMonth(currentMonth.clone().subtract(1, "jMonth"));
    } else {
      setCurrentMonth(currentMonth.clone().add(1, "jMonth"));
    }
  };
  
  const daysOfWeek = [
    "شنبه",
    "یک‌شنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];

  const firstDayOfMonth =
    (currentMonth.clone().startOf("jMonth").day() + 1) % 7;
  return (
    <div className="calendar px-48 text-center">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleMonthChange("prev")}
          className="bg-gray-300 px-2 py-1 rounded"
        >
          &lt;
        </button>
        <h2 className="text-center">{formattedMonth}</h2>
        <button
          onClick={() => handleMonthChange("next")}
          className="bg-gray-300 px-2 py-1 rounded"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((dayName, index) => (
          <div key={index} className="text-center font-bold">
            {dayName}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="day border p-2 rounded"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = currentMonth
            .clone()
            .startOf("jMonth")
            .add(i, "days")
            .format("YYYY-MM-DD");
          const dayEvents = events.filter((event) => event.date === date);
          const isToday = date === today;
          const isHoliday =
            currentMonth.clone().startOf("jMonth").add(i, "days").day() === 5 ||
            officialHolidays.includes(date);

          return (
            <Day
              key={i}
              date={convertToPersianNumbers(i + 1)}
              events={dayEvents}
              isToday={isToday}
              isHoliday={isHoliday}
              onClick={() => {
                setSelectedDate(date);
                if (dayEvents.length > 0) {
                  alert(
                    `رویدادهای روز ${convertToPersianNumbers(
                      i + 1
                    )}: ${dayEvents.map((e) => e.description).join(", ")}`
                  );
                }
              }}
              isFriday={false}
            />
          );
        })}
      </div>
      {selectedDate && (
        <EventModal date={selectedDate} onClose={() => setSelectedDate(null)} />
      )}
    </div>
  );
};
export default Calendar;
