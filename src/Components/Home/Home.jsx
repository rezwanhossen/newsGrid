import FeaturedSection from "./FeaturedSection/FeaturedSection";
import Banner from "./Banner/Banner/Banner";
import Sponsors from "./Sponsors/Sponsors";

import Another from "./AnotherNews/Another";
import News from "../Pages/News/News";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";



import Sports from "./Sports/Sports";


const Home = () => {
  

  
  
  const [category , setCategory] = useState('business');
  
  
  
  



  
    const apiKey = "d2cb59c8b438494b91e1450656f5cc1e";
    
        
    
    


    const {data : newsData = [] , isLoading} = useQuery({
      queryKey : ['news' , category],
      queryFn : async() => {
        const  response = await axios.get(
          'https://newsapi.org/v2/top-headlines' , {
            params : {
              apiKey : apiKey,
              category : category,
              pageSize : 95,
            }
          }
        );
      
      
      const news = response.data.articles.filter(news => news.title && news.urlToImage);
      return news
      }
    })
    if(isLoading){
      return <Loading></Loading>
    }
  return (
    <div>
      <div className="bg-sky-800 py-4 mt-2 fixed top-20 z-[19] w-full">
          <ul className="flex flex-wrap gap-4 items-center justify-center text-lg font-bold text-white font-sans">
          
            
            <li onClick={() => setCategory('business')} className="hover:cursor-pointer">Business</li>
            <li onClick={() => setCategory('sports')} className="hover:cursor-pointer">Sports</li>
            <li onClick={() => setCategory('general')} className="hover:cursor-pointer">General</li>
            <li onClick={() => setCategory('technology')} className="hover:cursor-pointer">Technology</li>
            <li onClick={() => setCategory('health')} className="hover:cursor-pointer">Health</li>
            <li onClick={() => setCategory('science')} className="hover:cursor-pointer">Science</li>

            

</ul>
      </div>
      
      <div className="mt-[210px] lg:mt-[170px] mb-[100px]">
      <Banner newsData={newsData}/>
      <News newsData={newsData}></News>
      <Sponsors></Sponsors>
      <Another newsData={newsData}></Another>
      </div>
      {/* <FeaturedSection></FeaturedSection> */}
      {/* <Sports></Sports> */}
    </div>
  );
};

export default Home;
