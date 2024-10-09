import { useEffect, useState } from "react";
import axios from "axios";

const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(7);
  const apiKey = 'uX-Tbv7wo0kWPez-lDxwvpryFy8240yUQek_C5a_qIYVl6kb'; // Currents API Key

  // Fetch real-time breaking news
  const fetchBreakingNews = async () => {
    try {
      const categories = ["politics", "sports", "technology"];
      const promises = categories.map((category) =>
        axios.get(`https://api.currentsapi.services/v1/latest-news`, {
          params: {
            apiKey: apiKey,
            category: category,
            language: 'en',
            page_size: 5,
          }
        })
      );
      const responses = await Promise.all(promises);
      const combinedNews = responses.flatMap((response) => response.data.news);
      combinedNews.sort((a, b) => new Date(b.published) - new Date(a.published));
      setBreakingNews(combinedNews);
    } catch (error) {
      console.error("Error fetching breaking news:", error);
    }
  };

  useEffect(() => {
    fetchBreakingNews();
    const intervalId = setInterval(fetchBreakingNews, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleShowMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 7);
  };

  return (
    <div className="mt-8 bg-[#F2F4F6] px-5 pt-3 pb-7 rounded-lg w-full">
      {/* Heading with Teal */}
      <h1 className="text-2xl md:text-3xl text-[#00A6A6] border-b-2 border-[#007E7E] font-extrabold mb-6 pb-2">
        Breaking News
      </h1>

      {/* First Card for Featured News */}
      <div className=" p-4 rounded-lg ">
        {breakingNews.length > 0 && (
          <div className="bg-white rounded-lg p-4 mb-6 relative">
            <img
              src={breakingNews[0].image}
              alt={breakingNews[0].title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50  px-3 py-1 rounded">
              <span className="text-sm">Breaking News</span>
            </div>
            <h3 className="text-xl font-semibold text-[#4A4A4A] leading-tight">
              {breakingNews[0].title}
            </h3>
            <p className="text-sm text-[#767676] mt-2 leading-snug">
              {breakingNews[0].description}
            </p>
            <a
              href={breakingNews[0].url}
              target="_blank"
              className="text-[#FF6F61] hover:text-[#007E7E] hover:underline  mt-2 block"
            >
              Read more
            </a>
          </div>
        )}

        {/* More News Section */}
        <h3 className="text-xl font-semibold mb-2 text-[#3BAFDA] border-b border-[#007E7E] pb-1">
          More Breaking News
        </h3>

        <div>
          {breakingNews.slice(1, visibleNewsCount).map((article, index) => (
            <div key={index} className="flex items-center mb-4 bg-white rounded-lg p-3">
              <img
                src={article.image}
                alt={article.title}
                className="w-32 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h4 className="text-md font-semibold leading-tight text-[#4A4A4A]">
                  {article.title}
                </h4>
                <p className="text-xs text-[#767676]">
                  {article.source} - {new Date(article.published).toLocaleDateString()}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF6F61] hover:text-[#007E7E] hover:underline text-xs"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {visibleNewsCount < breakingNews.length && (
          <button
            onClick={handleShowMore}
            className="bg-[#00A6A6] text-white rounded-md hover:bg-[#007E7E] px-4 py-2 mt-4 w-full "
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default BreakingNews;