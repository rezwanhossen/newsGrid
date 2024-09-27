import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    fetch("/newsData.json")
      .then((response) => response.json())
      .then((data) => {
        const foundItem = data.find((item) => item.id === parseInt(id));
        setNewsItem(foundItem);
      });
  }, [id]);

  if (!newsItem) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <img src={newsItem.image} alt={newsItem.title} className="mb-4" />
      <h1 className="text-3xl font-bold mb-2">{newsItem.title}</h1>
      <p className="text-gray-600 mb-4">{newsItem.websitename}</p>
      <a
        href={newsItem.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-500 underline hover:text-orange-700 transition"
      >
        Read more
      </a>
    </div>
  );
};

export default NewsDetail;
