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
    <div className="mt-8 p-4 max-w-md">
      <div className="bg-white p-4 rounded-lg shadow-md">
        {breakingNews.length > 0 && (
          <div className="mb-6 relative">
            <img
              src={breakingNews[0].image}
              alt={breakingNews[0].title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
              <span className="text-sm">Breaking News</span>
            </div>
            <h3 className="text-lg font-semibold leading-tight">{breakingNews[0].title}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-snug">{breakingNews[0].description}</p>
            <a
              href={breakingNews[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm mt-2 block"
            >
              Read more
            </a>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">Breaking News</h3>

        <div>
          {breakingNews.slice(1, visibleNewsCount).map((article, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                src={article.image}
                alt={article.title}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold leading-tight">{article.title}</h4>
                <p className="text-xs text-gray-500">
                  {article.source} - {new Date(article.published).toLocaleDateString()}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-xs"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>

        {visibleNewsCount < breakingNews.length && (
          <button
            onClick={handleShowMore}
            className="bg-red-600 text-white rounded px-4 py-2 mt-4 w-full"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default BreakingNews;
