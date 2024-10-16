// import { useEffect, useState } from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { FaVolumeUp, FaPause, FaPlay } from "react-icons/fa";

const RecommendedNews = ({setAllNewsRecommended}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  const apiKey = "pub_5554319d28e13bc8be1aab4736ea6ca4bbb0c";

  // Fetch recommended news from NewsData.io API
  const fetchRecommendedNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://newsdata.io/api/1/news", {
        params: {
          apikey: apiKey,
          country: "us",
          category: "entertainment",
          language: "en",
        },
      });
      setArticles(response.data.results.slice(0, 10));
      setAllNewsRecommended(response?.data?.results);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch recommended news. Please try again later.");
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecommendedNews();
  }, []);

  if (loading)
    return (
      <div className="text-center text-lg">Loading recommended news...</div>
    );
  if (error)
    return <div className="text-center text-lg text-red-500">{error}</div>;

  // Function to show more articles
  const handleShowMore = () => {
    setShowAll(true);
  };

  // Only show 2 articles by default, show all when "Show More" is clicked
  const displayedArticles = showAll ? articles : articles.slice(0, 3);

  // Handle speech synthesis
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

  return (
    <div className="p-5 mt-10 rounded-lg bg-[#F5F5F5]">
      <h1 className="text-4xl border-b-4 pb-4 text-[#3BAFDA] border-[#007E7E] font-extrabold mb-6">
        Recommended News
      </h1>

      {/* News list */}
      <div className="grid grid-cols-1 mt-5 gap-6">
        {displayedArticles.map((article, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-white shadow rounded-lg"
          >
            {/* Image */}
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-40 h-28 object-cover rounded-lg"
              />
            )}

            {/* Content */}
            <div className="flex-1">
              <h2 className="font-bold text-xl text-[#4A4A4A] mb-2">
                {article.title}
              </h2>
              <p className="text-[#767676] text-sm mb-2">
                {article.description}
              </p>
              <a
                href={article.link}
                className="text-orange-600 hover:text-[#00A6A6] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>

              {/* Read Button */}
              <button
                onClick={() =>
                  handleSpeak(`${article.title}. ${article.description}`)
                }
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
          </div>
        ))}
      </div>

      {/* Show more button */}
      {!showAll && articles.length > 2 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-[#00A6A6] text-white rounded-md hover:bg-[#007E7E] transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendedNews;
