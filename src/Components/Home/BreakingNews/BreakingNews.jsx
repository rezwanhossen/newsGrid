/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { FaVolumeUp, FaPause, FaPlay, FaBookmark } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth/useAuth";
import Swal from "sweetalert2";

const BreakingNews = ({ setAllNewsBreaking }) => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(7);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [date, setDate] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]); // State for bookmarks
  const { user } = useAuth();
  const apiKey = "uX-Tbv7wo0kWPez-lDxwvpryFy8240yUQek_C5a_qIYVl6kb"; // Currents API Key

  // Fetch real-time breaking news
  const fetchNews = async (selectedDate = "") => {
    setLoading(true);

    try {
      const url = `https://api.currentsapi.services/v1/search`;
      const params = {
        apiKey: apiKey,
        language: "en",
        start_date: selectedDate,
        end_date: selectedDate,
      };

      const response = await axios.get(url, { params });

      // Check if no news is found for the selected date
      if (response.data.news.length === 0) {
        setError("No breaking news found for this date.");
        setLoading(false);
        return;
      }

      // Update articles if news is found
      setBreakingNews(response.data.news.slice(0, 10));
      setAllNewsBreaking(response?.data?.news);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch breaking news. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Bookmark handling
  const handleBookmark = (article) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not logged in! Please log in to bookmark articles.",
        footer: '<a href="login">==> Click to Login <==</a>',
      });
      return;
    }

    const bookmarkedUrls = new Set(bookmarkedArticles.map((a) => a.url));

    if (bookmarkedUrls.has(article.url)) {
      Swal.fire(
        "Already Bookmarked",
        "This article is already in your bookmarks.",
        "info"
      );
      return;
    }

    const newBookmark = {
      image: article.image,
      title: article.title,
      url: article.url,
      email: user.email,
    };

    // Save bookmark to database
    fetch("http://localhost:5000/bookmarks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBookmark),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setBookmarkedArticles((prev) => [...prev, article]);
          Swal.fire({
            title: "Success!",
            text: "Article successfully added to bookmarks.",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((error) => {
        console.error("Error adding bookmark:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add bookmark. Please try again.",
        });
      });
  };

  if (loading)
    return <div className="text-center text-lg">Loading breaking news...</div>;
  if (error)
    return <div className="text-center text-lg text-red-500">{error}</div>;

  const handleShowMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 7);
  };

  // Handle Speak
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
      setCurrentUtterance(utterance); // Store the current utterance
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSearchByDate = () => {
    fetchNews(date);
  };

  // Handle Pause/Resume
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
    <div className="mt-8 bg-[#F2F4F6] px-5 pt-3 pb-7 rounded-lg w-full">
      {/* Heading with Teal */}
      <h1 className="text-2xl md:text-3xl text-[#00A6A6] border-b-2 border-[#007E7E] font-extrabold mb-6 pb-2">
        Breaking News
      </h1>
      {/* Date input for Time-Travel News Explorer */}
      <div className="mb-6">
        <input
          type="date"
          className="p-2 border border-gray-300 rounded-lg"
          value={date}
          onChange={handleDateChange}
        />
        <button
          onClick={handleSearchByDate}
          className="ml-4 px-4 py-2 bg-[#00A6A6] text-white rounded-md hover:bg-[#007E7E] transition"
        >
          Search News by Date
        </button>
      </div>

      {/* First Card for Featured News */}
      <div className="p-4 rounded-lg">
        {breakingNews.length > 0 && (
          <div className="bg-white rounded-lg p-4 mb-6 relative">
            <img
              src={breakingNews[0].image}
              alt={breakingNews[0].title}
              className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#4A4A4A] leading-tight">
              {breakingNews[0].title}
            </h3>
            <p className="text-sm text-[#767676] mt-2 leading-snug">
              {breakingNews[0].description}
            </p>
            <a
              href={breakingNews[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6F61] hover:text-[#007E7E] hover:underline mt-2 block"
            >
              Read more
            </a>

            {/* Bookmark Button */}
            <button className="flex items-center gap-2" onClick={() => handleBookmark(breakingNews[0])}>
              <FaBookmark /> Bookmark
            </button>

            {/* Read Button */}
            <button
              onClick={() =>
                handleSpeak(
                  `${breakingNews[0].title}. ${breakingNews[0].description}`
                )
              }
              className="mt-4 text-gray-600 hover:text-blue-500 flex items-center"
            >
              <FaVolumeUp className="mr-2" />
              {isSpeaking ? "Stop" : "Listen in Audio"}
            </button>

            {/* Pause/Resume Button */}
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
        )}

        {/* More News Section */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#3BAFDA] border-b border-[#007E7E] pb-1">
          More Breaking News
        </h3>

        <div>
          {breakingNews.slice(1, visibleNewsCount).map((article, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center mb-4 bg-white rounded-lg p-3"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full sm:w-32 h-20 sm:h-20 object-cover rounded-lg mb-2 sm:mr-4"
              />
              <div className="flex-1">
                <h4 className="text-md font-semibold leading-tight text-[#4A4A4A]">
                  {article.title}
                </h4>
                <p className="text-xs text-[#767676]">
                  {article.source} -{" "}
                  {new Date(article.published).toLocaleDateString()}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF6F61] hover:text-[#007E7E] hover:underline text-xs"
                >
                  Read more
                </a>

                {/* Bookmark Button */}
                <button
                  onClick={() => handleBookmark(article)}
                  className="mt-2 text-gray-600 hover:text-blue-500 flex items-start"
                >
                  <FaBookmark className="mr-2" />
                  Bookmark
                </button>

                {/* Read Button */}
                <button
                  onClick={() =>
                    handleSpeak(`${article.title}. ${article.description}`)
                  }
                  className="mt-2 text-gray-600 hover:text-blue-500 flex"
                >
                  <FaVolumeUp className="mr-2" />
                  {isSpeaking ? "Stop" : "Listen in Audio"}
                </button>

                {/* Pause/Resume Button */}
                {isSpeaking && (
                  <button
                    onClick={handlePauseResume}
                    className="mt-2 text-gray-600 hover:text-blue-500 flex items-start "
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

        {/* Show More Button */}
        {visibleNewsCount < breakingNews.length && (
          <button
            onClick={handleShowMore}
            className="bg-[#00A6A6] text-white rounded-md hover:bg-[#007E7E] px-4 py-2 mt-4 w-full"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default BreakingNews;
