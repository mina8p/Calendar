import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../redux/eventsSlice";
interface EventModalProps {
  date: string;
  onClose: () => void;
}
const EventModal: React.FC<EventModalProps> = ({ date, onClose }) => {
  const [eventText, setEventText] = useState("");
  const dispatch = useDispatch();
  const handleAddEvent = () => {
    if (eventText.trim()) {
      dispatch(addEvent({ date, description: eventText.trim() }));
      setEventText("");
      onClose();
    }
  };
  return (
    <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h2 className="mb-2">افزودن رویداد </h2>
        <input
          type="text"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          className="border p-1 w-full mb-2"
        />
        <button
          onClick={handleAddEvent}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          افزودن رویداد
        </button>
        <button onClick={onClose} className="ml-2 px-4 py-2">
          لغو
        </button>
      </div>
    </div>
  );
};
export default EventModal;
