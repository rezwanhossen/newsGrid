import React, { useEffect, useState } from "react";
import Card from "../../../../Shared/Card";
import useNews from "../../../../hooks/useNews";

const CardLayout = () => {
  const [newsData] = useNews();
  console.log(newsData);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 ">
      {newsData?.slice(4 , 8).map((singleNews, idx) => 
       <Card key={idx} news={singleNews}></Card>
)}
    </div>
  );
};

export default CardLayout;
