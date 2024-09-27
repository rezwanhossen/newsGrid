import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaShareAlt } from "react-icons/fa";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "react-share";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../../Hook/useAuth/useAuth";

const FeaturedSection = () => {
  const { user, loding } = useAuth();
  const [newsData, setNewsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleBookmark = (newsItem) => {
    const { image, title } = newsItem;
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
            text: "News successfully added to bookmarks",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } else {
          return toast.error("You need to sign in first");
        }
      });
  };

  useEffect(() => {
    fetch("/newsData.json")
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data);
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const displayedNews = selectedCategory
    ? newsData.filter((item) => item.category === selectedCategory)
    : newsData;

  return (
    <div className="container mx-auto my-16 px-4 lg:px-0">
      {/* Featured News Section Header */}
      <div className="bg-white shadow-md py-4 mb-8 border-b sticky top-0 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between lg:px-5">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Featured News</h2>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-end mt-2 md:mt-0">
            <button
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === null
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedNews.length > 0 ? (
          displayedNews.map((newsItem) => (
            <div
              key={newsItem.id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 relative"
            >
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-bold mb-2">{newsItem.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{newsItem.websitename}</p>

              <div className="space-x-4 absolute left-1/2 transform -translate-x-1/2 bottom-3">
                <Link
                  to={`/compare/${newsItem.keyword}`}
                  className="text-orange-500 underline hover:text-orange-700 transition"
                >
                  Compare
                </Link>
              </div>

              {/* Bookmark & Share */}
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleBookmark(newsItem)}
                  className="flex items-center text-gray-600 hover:text-orange-700 transition"
                >
                  <FaBookmark className="mr-2" /> Bookmark
                </button>

                {/* Share Options */}
                <div className="flex items-center gap-2">
                  <FaShareAlt className="mr-2 text-gray-600" />
                  <FacebookShareButton
                    url={`${window.location.origin}/news/${newsItem.id}`}
                    className="hover:scale-110 transition-transform"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={`${window.location.origin}/news/${newsItem.id}`}
                    className="hover:scale-110 transition-transform"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={`${window.location.origin}/news/${newsItem.id}`}
                    className="hover:scale-110 transition-transform"
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedSection;
