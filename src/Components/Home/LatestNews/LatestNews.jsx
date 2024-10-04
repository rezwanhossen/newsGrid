import { useEffect, useState } from "react";
import axios from "axios";

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "29c7cc0c18bbf8668fe115bf0a6536f1";
  const pageSize = 3;

  // Fetch the latest news
  const fetchLatestNews = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=us&limit=${pageSize}&offset=${page * pageSize}`
      );
      setNews(response.data.data);
      const totalResults = response.data.pagination.total;
      setTotalPages(Math.ceil(totalResults / pageSize));
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestNews(currentPage);
  }, [currentPage]);

  // Handle page changes
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Latest News</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={article.image } 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-semibold"
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <p className="text-sm text-gray-700">
              Page {currentPage + 1} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LatestNews;
