import React from "react";
import Calendar from "./components/Calender";
const App: React.FC = () => {
  return (
    <div className="App container mx-auto">
      <h1 className="text-center text-2xl font-bold my-4">تقویم من</h1>
      <Calendar />
    </div>
  );
};
export default App;
