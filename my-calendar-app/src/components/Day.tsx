import React from "react";
interface DayProps {
  date: string;
  events: { date: string; description: string }[];
  isToday: boolean;
  isFriday: boolean;
  isHoliday: boolean;
  onClick: () => void;
}
const Day: React.FC<DayProps> = ({
  date,
  events,
  isToday,
  isFriday,
  isHoliday,
  onClick,
}) => {
  return (
    <div
      className={`day border p-2 cursor-pointer rounded  ${
        isToday ? "bg-blue-500 text-white" : ""
      } ${
        isFriday || isHoliday ? "bg-red-500 text-white" : ""
      } hover:bg-gray-500`}
     
      onClick={onClick}
    >
      <div>{date}</div>
      {events.length > 0 && (
        <div className="text-xs mt-1">
          {events.map((event, index) => (
            <div key={index} className="text-gray-700">
              {event.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Day;
