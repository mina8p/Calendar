// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// interface Event {
//   date: string;
//   description: string;
// }
// interface EventsState {
//   events: Event[];
// }
// const initialState: EventsState = { events: [] };
// const eventsSlice = createSlice({
//   name: "events",
//   initialState,
//   reducers: {
//     addEvent: (state, action: PayloadAction<Event>) => {
//       state.events.push(action.payload);
//     },
//   },
// });
// export const { addEvent } = eventsSlice.actions;
// export default eventsSlice.reducer;
//////

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event {
  date: string;
  description: string;
}

interface EventsState {
  events: Event[];
}

const saveToLocalStorage = (events: Event[]) => {
  localStorage.setItem("events", JSON.stringify(events));
};

const loadFromLocalStorage = (): Event[] => {
  const events = localStorage.getItem("events");
  return events ? JSON.parse(events) : [];
};

const initialState: EventsState = { events: loadFromLocalStorage() };

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
      saveToLocalStorage(state.events);
    },
  },
});
export const { addEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
