import TwoColumnLayout from "./TwoColumnLayout/TwoColumnLayout";
import { Parallax } from "react-parallax";
import ThreeColumnLayout from "./ThreeColumnLayout/ThreeColumnLayout";
import Carousel from "./Carousel/Carousel";
import { useEffect, useState } from "react";
import useNews from "../../../hooks/useNews";

const News = ({ newsData }) => {
  return (
    <div>
      {/* news */}
      <div className="container mx-auto mt-4">
        {/* two column layout  */}
        <TwoColumnLayout data={newsData?.slice(8, 10)}></TwoColumnLayout>
        <ThreeColumnLayout data={newsData?.slice(10, 22)}></ThreeColumnLayout>
      </div>
      <Carousel data={newsData?.slice(22, 29)}></Carousel>

      {/* Pagination বাটন */}
      {/* <div> */}
      {/* <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="btn"
                >
                    Previous Page
                </button>

                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={news.length < itemsPerPage}
                    className="btn"
                >
                    Next Page
                </button> */}
      {/* </div> */}
    </div>
  );
};

export default News;
