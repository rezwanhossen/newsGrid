
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



const Home = () => {
    const [newsData , isLoading] = useNews();

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      

      

      <div className="mt-[210px] lg:mt-[150px] mb-[100px]">
        <Banner newsData={newsData} />
        <News newsData={newsData}></News>

        <Sponsors></Sponsors>
        <Another newsData={newsData}></Another>
        <FeaturedSection></FeaturedSection>
      </div>
      
    </div>
  );

};

export default Home;
