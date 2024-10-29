import { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth/useAuth";
import axios from "axios";

const NewsPersonal = () => {
  const { user } = useAuth();
  const userEmails = user?.email;
  const [storeSelecetedCategory, setStoreSelectedCategory] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  // Fetch user-selected categories
  useEffect(() => {
    if (userEmails) {
      const getUserSelectedCategories = async () => {
        try {
          const res = await axios.get(
            `https://news-grid-server.vercel.app/getstorevalue/${userEmails}`
          );
          setStoreSelectedCategory(res?.data?.selectedCategory || []);
        } catch (error) {
          console.log("Error in fetching user data:", error);
        }
      };
      getUserSelectedCategories();
    }
  }, [userEmails]);

  // Fetch news data for all selected categories
  useEffect(() => {
    if (storeSelecetedCategory.length > 0) {
      const getDataByCategory = async () => {
        try {
          const allNewsData = await Promise.all(
            storeSelecetedCategory.map(async (category) => {
              const res = await axios.get(
                `https://newsdata.io/api/1/news?apikey=pub_56209614b257f56b188a4ebf87ce263055c0c&q=${category}`
              );
              // Attach category to each news item
              return res?.data?.results.map((item) => ({
                ...item,
                category: category,
              }));
            })
          );
          const flattenedData = allNewsData.flat();
          setNewsData(flattenedData);
          setFilteredNews(flattenedData); // Initially, show all news
        } catch (error) {
          console.log("Error in fetching news data:", error);
        }
      };
      getDataByCategory();
    }
  }, [storeSelecetedCategory]);

  // Handle category button click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // Filter news by selected category
    const filtered = newsData.filter(
      (newsItem) => newsItem?.category?.toLowerCase() === category.toLowerCase()
    );
    setFilteredNews(filtered);
  };

  // Show all news if 'All' is clicked
  const handleAllClick = () => {
    setActiveCategory("");
    setFilteredNews(newsData); // Reset to all news
  };

  // Helper function to truncate text (for both title and description)
  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  return (
    <div>
      <div className="w-10/12 mx-auto ">
        <p>Alhamdulillah This is News Personal Component</p>

        {/* Category Filter Buttons */}
        <div className="flex space-x-4 my-4">
          <button
            onClick={handleAllClick}
            className={`px-4 py-2 rounded ${
              activeCategory === "" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            All
          </button>
          {storeSelecetedCategory.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredNews.length > 0 ? (
            filteredNews.map((newsItem, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* Show Image */}
                <img
                  src={
                    newsItem.image_url ||
                    "https://i.ibb.co.com/Vgggtfd/images-1.png"
                  } // Placeholder image if no image
                  alt={newsItem.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  {/* Show Category */}
                  <p className="text-blue-500 font-semibold mb-2">
                    {newsItem.category}
                  </p>

                  {/* Show Title (truncated) */}
                  <h2 className="text-lg font-bold mb-2">
                    {truncateText(newsItem.title, 50)}{" "}
                    {/* Limit title length */}
                  </h2>

                  {/* Show Description (truncated) */}
                  <p className="text-gray-700 mb-4">
                    {newsItem.description
                      ? truncateText(newsItem.description, 100) // Limit description length
                      : "No description available."}
                  </p>

                  {/* Link to full article */}
                  <a
                    href={newsItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No news available for the selected category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPersonal;
