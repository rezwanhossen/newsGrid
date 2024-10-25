/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "../../../../Shared/Card";
import Slider from "../Slider/Slider";
import { FaVolumeUp, FaPause, FaPlay } from 'react-icons/fa';


const Banner = ({ newsData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  

  const itemsPerPage = 3;

  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedNews = newsData?.slice(
    10 + startIndex,
    10 + startIndex + itemsPerPage
  );

  // Check if there's more news to show
  const hasMoreNews = newsData?.length > 10 + startIndex + itemsPerPage;

  // Handle speech 
  const handleSpeak = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentUtterance(null);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentUtterance(null);
      };
      setCurrentUtterance(utterance);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Handle pause and resume functionality
  const handlePauseResume = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleNextPage = () => {
    if (hasMoreNews) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="mt-10 mb-10">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Carousel: Full width */}
          <div className="w-full">
            <Slider newsData={newsData} />

            {/* 3-column card layout with pagination */}
            <div className="lg:mx-0 mt-5 p-5 rounded-lg bg-[#F5F5F5]">
              <div>
                <h2 className="text-2xl md:text-3xl border-b-4 pb-4 text-[#3BAFDA] border-[#007E7E] font-bold">
                  Latest News
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 lg:gap-8">
                {selectedNews?.map((news, index) => (
                  <div key={index} className="relative">
                    <Card news={news} />

                    {/* Read  Button */}
                    <button
                      onClick={() => handleSpeak(`${news.title}. ${news.description}`)}
                      className="mt-4 text-gray-600 hover:text-blue-500 flex items-center"
                    >
                      <FaVolumeUp className="mr-2" />
                      {isSpeaking ? "Stop" : "Listen in Audio"}
                    </button>

                    {/* Pause and Resume Button */}
                    {isSpeaking && (
                      <button
                        onClick={handlePauseResume}
                        className="mt-2 text-gray-600 hover:text-blue-500 flex items-center"
                      >
                        {isPaused ? (
                          <>
                            <FaPlay className="mr-2" />
                            Resume
                          </>
                        ) : (
                          <>
                            <FaPause className="mr-2" />
                            Pause
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination: Show "Next" button if there are more news items */}
              {hasMoreNews && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleNextPage}
                    className="flex items-center bg-[#00A6A6] text-white px-4 py-2 rounded-lg hover:bg-[#007E7E] transition duration-300"
                  >
                    <span>Show More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 000 2h4a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
