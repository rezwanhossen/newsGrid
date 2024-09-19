import React, { useEffect, useState } from "react";
import Card from "../../../../Shared/Card";

const CardLayout = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 ">
      {news?.map((singleNews, idx) => (
        <Card key={idx} news={singleNews}></Card>
      ))}
    </div>
  );
};

export default CardLayout;
