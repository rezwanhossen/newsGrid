import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../Hook/useAuth/useAuth";
import toast from "react-hot-toast";

const PersonalizedNews = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [objectDataForStoreInMongodb, setObjDataForStoreInMongodb] =
    useState(null);
  console.log("alhamdulillah category is", selectedCategory);
  // alhamdulillah
  const { user } = useAuth();
  const userEmail = user.email;

  const categories = [
    "Business",
    "Technology",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "World",
    "Politics",
    "Environment",
    "Education",
    "Lifestyle",
    "Finance",
    "Travel",
    "Food",
    "Art",
    "Culture",
    "History",
    "Fashion",
    "Automobiles",
    "Books",
    "Gaming",
    "Music",
    "Movies",
    "Theater",
    "Photography",
    "Space",
    "Pets",
    "Real Estate",
    "Startups",
    "Cryptocurrency",
  ];

  const handleBtnClick = (category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((item) => item !== category));
      toast(`You have unselected ${category}`);
    } else {
      setSelectedCategory([...selectedCategory, category]);
      toast(`You have selected ${category}`);
    }
  };

  useEffect(() => {
    if (selectedCategory.length > 0) {
      const obj = {
        selectedCategory,
        userEmail,
      };
      setObjDataForStoreInMongodb(obj);
    }
  }, [selectedCategory, userEmail]);

  useEffect(() => {
    if (objectDataForStoreInMongodb !== null) {
      const postSelectedCategoryInMongodb = async () => {
        try {
          const res = await axios.post(
            "https://news-grid-server.vercel.app/storevalue",
            objectDataForStoreInMongodb
          );

          console.log("Response from the server:", res);

          if (res.data && res.data.insertedId) {
            console.log("Alhamdulillah data added successfully");
          } else {
            console.log("Unexpected response structure:", res.data);
          }
        } catch (error) {
          console.log("I found an error in my code", error);
        }
      };
      postSelectedCategoryInMongodb();
    }
  }, [objectDataForStoreInMongodb]);

  return (
    <div className="w-10/12 mx-auto min-h-screen py-12 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Choose Categories */}
        <div className="p-6 bg-gray-100">
          <h1 className="text-xl font-semibold mb-4 text-center">
            Choose Categories
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleBtnClick(category)}
                className={`w-full   p-2 rounded-full text-lg font-semibold border-2 transition duration-300 ${
                  selectedCategory.includes(category)
                    ? "bg-green-500 text-white"
                    : "bg-white text-black hover:bg-green-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Selected Categories */}
        <div className="p-6 bg-gray-100">
          <h1 className="text-xl font-semibold mb-4 text-center">
            Selected Categories
          </h1>
          <div className="flex flex-wrap gap-4">
            {selectedCategory.length > 0 ? (
              selectedCategory.map((showCategory, idx) => (
                <div
                  className="bg-blue-100 px-4 py-2 text-blue-700 font-semibold rounded-lg"
                  key={idx}
                >
                  {showCategory}
                </div>
              ))
            ) : (
              <p className="text-gray-500"></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedNews;
