
import FeaturedSection from "./FeaturedSection/FeaturedSection";
// import Banner from "./Banner/Banner/Banner";
import Sponsors from "./Sponsors/Sponsors";

import Another from "./AnotherNews/Another";
import News from "../Pages/News/News";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import Banner from "./Banner/Banner/Banner";

import { Navigate } from "react-router-dom";
import useNews from "../../hooks/useNews";
import TrendingNews from "./TrendingNews/TrendingNews";




const Home = () => {
    const [newsData , isLoading] = useNews();

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      

      

      <div className="mt-[187px] lg:mt-[150px] mb-[100px]">
        <Banner newsData={newsData} />
        <News newsData={newsData}></News>

        <Another newsData={newsData}></Another>

        <Sponsors></Sponsors>

        <TrendingNews></TrendingNews>
      </div>
      
    </div>
  );

};

export default Home;
