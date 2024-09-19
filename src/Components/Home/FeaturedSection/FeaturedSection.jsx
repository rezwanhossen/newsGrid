import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    // Fetch the JSON data
    fetch("/newsData.json")
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data);


        // Extract unique categories from the news data
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter news items based on selected category, or show all if no category is selected
  const displayedNews = selectedCategory
    ? newsData.filter((item) => item.category === selectedCategory)
    : newsData;

  return (
    <>
    <div className="container mx-auto my-16 px-4 lg:px-0">
      
      <div className="sticky top-20 z-10 bg-white shadow-md py-4 mb-8 border-b">
        <div className=" top-16 z-10 bg-white  py-4 mb-8 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between lg:px-5">
            {/* Featured News Title on the left */}
            <h2 className="text-xl font-bold mb-4 md:mb-0">Featured News</h2>

            {/* Categories Buttons */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-end mt-2 md:mt-0">
              {/* "All" button */}
              <button
                className={`px-4 py-2 rounded-full transition duration-300 ${
                  selectedCategory === null
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </button>

              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full transition duration-300 ${
                    selectedCategory === category
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>


            {/* News based on category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedNews.length > 0 ? (
                    displayedNews.map((newsItem) => (
                        <div key={newsItem.id} className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 relative">
                            <img
                                src={newsItem.image}
                                alt={newsItem.title}
                                className="w-full h-40 object-cover mb-4 rounded"
                            />
                            <h3 className="text-lg font-bold mb-2">{newsItem.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{newsItem.websitename}</p>
                           
                           <div className="space-x-4  absolute left-1/2 transform -translate-x-1/2 bottom-3">
                           <a
                                href={newsItem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 underline hover:text-orange-700 transition duration-300"
                            >
                                Read more
                            </a>
                            <Link to={`/compare/${newsItem?.keyword}`} className="text-orange-500 underline hover:text-orange-700 transition duration-300">Compare</Link>
                           </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No news available in this category.</p>
                )}
            </div>

        </div>
      </div>
    </>
  );
};

export default FeaturedSection;
