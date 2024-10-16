import { useEffect, useState } from "react";
import axios from "axios";
import { FaBookmark, FaVolumeUp, FaPause, FaPlay } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth/useAuth";

const TrendingNews = ({setAllNewsTrending}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const apiKey = "uX-Tbv7wo0kWPez-lDxwvpryFy8240yUQek_C5a_qIYVl6kb";

  const { user } = useAuth();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.currentsapi.services/v1/latest-news",
        {
          params: {
            apiKey: apiKey,
            language: "en",
          },
        }
      );
      setArticles(response.data.news.slice(0, 10));
      setAllNewsTrending(response?.data?.news);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch news. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading)
    return <div className="text-center text-lg">Loading news...</div>;
  if (error)
    return <div className="text-center text-lg text-red-500">{error}</div>;

  const handleSpeak = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handlePause = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleBookmark = (newsItem) => {
    const image = newsItem.image;
    const title = newsItem.title;
    const email = user?.email;
    const listOfBookmark = { image, title, email };

    fetch("http://localhost:5000/bookmarks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(listOfBookmark),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId && user) {
          Swal.fire({
            title: "Success!",
            text: "Article successfully added to bookmark",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You Are Not Logged In Yet!!!",
            footer: '<a href="login">==> Click to Login <==</a>',
            color: "red",
          });
        }
      });
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const displayedArticles = showAll ? articles : articles.slice(0, 2);

  return (
    <div className="p-5 bg-[#F5F5F5] rounded-lg">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#3BAFDA] border-b-4 pb-4 border-[#007E7E] font-extrabold mb-6">
        Trending News
      </h1>
      <div className="grid grid-cols-1 gap-6 mt-5">
        {displayedArticles.map((article, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start gap-4 p-4 bg-white shadow rounded-lg"
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full md:w-40 lg:w-48 h-32 object-cover rounded-lg"
              />
            )}

            <div className="flex-1">
              <h2 className="font-bold text-xl md:text-lg lg:text-xl text-[#4A4A4A] mb-2">
                {article.title}
              </h2>
              <p className="text-[#767676] text-sm md:text-xs lg:text-sm mb-2">
                {article.description}
              </p>
              <a
                href={article.url}
                className="text-[#FF9A8B] hover:text-[#00A6A6] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="text-[#4A4A4A] font-bold">Share: </span>
                <FacebookShareButton url={article.url}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={article.url}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url={article.url}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <button
                  onClick={() => handleBookmark(article)}
                  className="ml-4 flex items-center text-gray-600 hover:text-orange-500"
                  aria-label="Bookmark"
                >
                  <FaBookmark size={24} className="mr-2" />
                  Bookmark
                </button>

                <button
                  onClick={() => handleSpeak(`${article.title}. ${article.description}`)}
                  className="ml-4 flex items-center text-gray-600 hover:text-blue-500"
                  aria-label="Listen in Audio"
                >
                  <FaVolumeUp size={24} className="mr-2" />
                  {isSpeaking ? "Stop" : "Listen in Audio"}
                </button>

                {isSpeaking && (
                  <button
                    onClick={handlePause}
                    className="ml-4 flex items-center text-gray-600 hover:text-blue-500"
                    aria-label="Pause/Resume"
                  >
                    {isPaused ? (
                      <>
                        <FaPlay size={24} className="mr-2" />
                        Resume
                      </>
                    ) : (
                      <>
                        <FaPause size={24} className="mr-2" />
                        Pause
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

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

export default TrendingNews;
