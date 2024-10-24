import { useEffect, useState } from "react";


const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6 mb-6">
      <div className="">
        <h2 className="text-2xl font-bold text-[#3BAFDA] border-b-2 border-[#007E7E]">Current Date & Time</h2>
        <p className="text-lg mt-2 text-[#767676]">{formatDate(currentDateTime)}</p>
        <p className="text-4xl font-semibold mt-2 text-[#00A6A6]">{formatTime(currentDateTime)}</p>
      </div>
    </div>
  );
};

export default DateTime;
