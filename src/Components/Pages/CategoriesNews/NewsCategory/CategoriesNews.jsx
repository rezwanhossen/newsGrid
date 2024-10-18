/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";


import { useParams } from "react-router-dom";
import axios from "axios";


import { Parallax } from "react-parallax";

import TwoColumnLayout from "../../News/TwoColumnLayout/TwoColumnLayout";
import ThreeColumnLayout from "../../News/ThreeColumnLayout/ThreeColumnLayout";
import Loading from "../../../Loading/Loading";
import ReadMoreLink from "../../../../Shared/ReadMoreLink";
import UserAddedNews from "../UserAddedNews";
import { useEffect, useState } from "react";



const CategoriesNews = () => {
    
     
     const {category} = useParams();
     

    const {data : newsData , isLoading} = useQuery({
        queryKey : ['categoriesNews' , category] , 
        queryFn : async() => {
            const response = await axios.get(`http://localhost:5000/top-headlines?category=${category}`);
            
            console.log(response.data , 'dddddd')
    const news = response?.data?.data?.articles.filter(
      (news) => news.title && news.urlToImage)
      console.log("newsttttt : " , news);

      return news;

        }
    
    })



    const [categoryNews , setCategoryNews] = useState([]);
    useEffect( () => {
        axios.get(`http://localhost:5000/myNews/category?category=${category}`)
        .then(res => {
            console.log("res : " , res.data)
            setCategoryNews(res.data);
        })
    }, [category])
    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="mt-36">
            <Parallax bgImage={"https://static.vecteezy.com/system/resources/previews/033/212/422/non_2x/modern-television-studio-for-world-breaking-news-with-equipment-for-leading-reporters-and-announcers-free-photo.jpg"} strength={500} className="h-[400px] lg:h-[500px]  w-full ">
      <div className="h-[400px] lg:h-[500px]   w-[100%] bg-black opacity-75 flex justify-center items-center"> 
                <h1 className="text-4xl text-center text-white font-bold uppercase font-mono">HOME || {category}</h1>
         
      </div>
    </Parallax>
            </div>

        <div className="container mx-auto  my-20">
              

            
                <TwoColumnLayout data={newsData?.slice(0,2)}></TwoColumnLayout>
                <ThreeColumnLayout data={newsData?.slice(2 , 11)}></ThreeColumnLayout>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {
                    newsData?.slice(11).map(news => {
                        return (
                            
                <div className="py-4  border-t  border-dashed border-gray-500 mx-4 lg:mx-0">
              {/* left side nav */}
              <div className="flex flex-col-reverse lg:flex-row  ">
                <p className="font-semibold w-full lg:w-[16%]">
                  {news?.publishedAt}
                </p>
                <div className="w-full lg:w-[53%] lg:px-3">
                  <p className="text-red-500 mb-2">
                    Author : {news?.author?.slice(0, 20)}...
                  </p>

                  <h2 className="text-xl font-bold">
                    {news?.title.slice(0, 50)}...
                  </h2>
                  

                  
                  <p className="">{news?.description?.slice(0, 80)}...</p>

                  <div className="mt-2">
                    <ReadMoreLink news={news}></ReadMoreLink>
                  </div>
                </div>
                <div className="w-full lg:w-[30%] flex  items-center">
                  <img
                    src={news?.urlToImage}
                    alt=""
                    className="w-full lg:h-[150px]"
                  />
                </div>
              </div>
            </div>


                
                        )
                    })
                }
                </div>



        <UserAddedNews categoryNews={categoryNews}></UserAddedNews>
        </div>


        </div>
    );
};

export default CategoriesNews;