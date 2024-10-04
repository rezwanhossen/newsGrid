import { useEffect, useState } from "react";
import axios from "axios";

const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(7); // Initially show 7 news

  // Fetch real-time breaking news from multiple categories
  const fetchBreakingNews = async () => {
    try {
      const categories = ["politics", "sports", "technology"];
      const promises = categories.map((category) =>
        axios.get(
          `https://gnews.io/api/v4/top-headlines?token=6f3f93b16b576e746fad8f6b44546560&lang=en&topic=${category}&max=5`
        )
      );
      const responses = await Promise.all(promises);
      
      // Combine all news articles from different categories into one array
      const combinedNews = responses.flatMap((response) => response.data.articles);
      
      // Sort articles by publication date for real-time relevance
      combinedNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      
      // Update breaking news state
      setBreakingNews(combinedNews);
    } catch (error) {
      console.error("Error fetching breaking news:", error);
    }
  };

  // Fetch news every 5 minutes for real-time updates
  useEffect(() => {
    fetchBreakingNews();
    const intervalId = setInterval(fetchBreakingNews, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Function to show more news on button click
  const handleShowMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 7); // Show 7 more articles
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-red-600">Breaking News</h2>

        {/* Display the first breaking news item as featured */}
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

        {/* Section title */}
        <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">Breaking News</h3>

        {/* Display the rest of the breaking news items, initially limited to visibleNewsCount */}
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
                  {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
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

        {/* Show More Button: Only show if there are more articles to display */}
        {visibleNewsCount < breakingNews.length && (
          <button
            onClick={handleShowMore}
            className="w-full bg-blue-500 text-white text-sm px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default BreakingNews;
