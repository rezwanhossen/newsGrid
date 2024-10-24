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

import { useDispatch } from "react-redux";
import { setCategoriesNews } from "../../../../features/allNews/allNewsSlice";
import { IoMdTime } from "react-icons/io";

const CategoriesNews = ({ allNews }) => {
  //  console.log("allNews" , allNews);

  const apiKey = import.meta.env.VITE_NAIMUL_API_KEY;

  const { category } = useParams();
  const dispatch = useDispatch();

  const { data: newsData, isLoading } = useQuery({
    queryKey: ["categoriesNews", category],
    queryFn: async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${apiKey}`
      );

      const news = response?.data?.articles.filter(
        (news) => news.title && news.urlToImage
      );
      console.log("newsttttt : ", news);
      dispatch(setCategoriesNews(news));

      return news;
    },
  });

  console.log("newsDaata : ", newsData);

  const [categoryNews, setCategoryNews] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/myNews/category?category=${category}`)
      .then((res) => {
        // console.log("res : " , res.data)
        setCategoryNews(res.data);
      });
  }, [category]);
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="mt-[136px]">
        <Parallax
          bgImage={
            "https://static.vecteezy.com/system/resources/previews/033/212/422/non_2x/modern-television-studio-for-world-breaking-news-with-equipment-for-leading-reporters-and-announcers-free-photo.jpg"
          }
          strength={500}
          className="h-[400px] lg:h-[500px]  w-full "
        >
          <div className="h-[400px] lg:h-[500px] heebo   w-[100%] bg-black opacity-75 flex justify-center items-center">
            <h1 className="text-xl lg:text-3xl text-center text-white font-bold uppercase">
              HOME <span className="px-3">||</span> {category}
            </h1>
          </div>
        </Parallax>
      </div>

      <div className="container mx-auto mt-20">
        <TwoColumnLayout data={newsData?.slice(0, 2)}></TwoColumnLayout>
        <ThreeColumnLayout data={newsData?.slice(2, 11)}></ThreeColumnLayout>

        <div className="heebo mt-3 mx-3  md:mx-0">
          <h1 className="text-3xl font-bold mt-10 mb-6  border-l-[#005689] border-l-8 pl-3">
            More News
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 md:gap-16 mx-3 md:mx-0">
          <div>
            {newsData?.slice(11, 14).map((news) => {
              return (
                <div className="flex flex-col-reverse lg:flex-row  heebo border-t-4  border-dotted py-5 border-[#005689]">
                  <p className="font-semibold w-full lg:w-[25%]  hidden md:block">
                    <div className="flex gap-4">
                      <IoMdTime className="text-lg" />
                      <span>{news?.publishedAt.slice(0, 10)}</span>
                    </div>
                  </p>
                  <div className="w-full lg:w-[50%] lg:pr-6 mt-3 md:mt-0">
                    <div className="flex items-center">
                      <p className="text-[#005689] mb-2">
                        Author : {news?.author?.slice(0, 20)}...
                      </p>
                    </div>

                    <h2 className=" font-bold">
                      {news?.title.slice(0, 30)}...
                    </h2>

                    <p className="text-justify my-1 heebo text-[15px]">
                      {news?.description?.slice(0, 60)}...
                    </p>

                    <div className="mt-2 flex justify-between items-center">
                      <ReadMoreLink news={news}></ReadMoreLink>
                    </div>
                  </div>
                  <div className="w-full lg:w-[25%] flex  items-center">
                    <img
                      src={news?.urlToImage}
                      alt=""
                      className="w-full lg:h-[150px] object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border border-[#005689] hidden md:block"></div>
          <div>
            <div>
              {newsData?.length > 16 ? (
                newsData?.slice(15, 18).map((news) => {
                  return (
                    <div className="flex flex-col-reverse lg:flex-row  heebo border-t-4  border-dotted py-5 border-[#005689]">
                      <p className="font-semibold w-full lg:w-[25%]  hidden md:block">
                        <div className="flex gap-4">
                          <IoMdTime className="text-lg" />
                          <span>{news?.publishedAt.slice(0, 10)}</span>
                        </div>
                      </p>
                      <div className="w-full lg:w-[50%] lg:pr-6">
                        <div className="flex items-center">
                          <p className="text-[#005689] mb-2 mt-3 md:mt-0">
                            Author : {news?.author?.slice(0, 20)}...
                          </p>
                        </div>

                        <h2 className=" font-bold">
                          {news?.title.slice(0, 30)}...
                        </h2>

                        <p className="text-justify my-1 heebo text-[15px]">
                          {news?.description?.slice(0, 60)}...
                        </p>

                        <div className="mt-2 flex justify-between items-center">
                          <ReadMoreLink news={news}></ReadMoreLink>
                        </div>
                      </div>
                      <div className="w-full lg:w-[25%] flex  items-center">
                        <img
                          src={news?.urlToImage}
                          alt=""
                          className="w-full lg:h-[150px] object-cover"
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <div className="flex flex-col-reverse lg:flex-row  heebo border-t-4  border-dotted py-5 border-[#005689]">
                    <p className="font-semibold w-full lg:w-[25%]  hidden md:block">
                      <div className="flex gap-4">
                        <IoMdTime className="text-lg" />
                        <span>10-23-2024</span>
                      </div>
                    </p>
                    <div className="w-full lg:w-[50%] lg:pr-6">
                      <div className="flex items-center">
                        <p className="text-[#005689] mb-2 mt-3 md:mt-0">
                          Author : Naimul
                        </p>
                      </div>

                      <h2 className=" font-bold">
                        Festivals of Dhaka: A Celebration of Culture
                      </h2>

                      <p className="text-justify my-1 heebo text-[15px]">
                        Born poor in colonial India and dead at 32, Ramanujan
                        had fa...
                      </p>

                      <div className="mt-2 flex justify-between items-center">
                        <ReadMoreLink
                          news={
                            "https://en.wikipedia.org/wiki/Culture_of_Dhaka#Festivals"
                          }
                        ></ReadMoreLink>
                      </div>
                    </div>
                    <div className="w-full lg:w-[25%] flex  items-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Mangal_Shobhajatra_in_Dhaka.jpg/640px-Mangal_Shobhajatra_in_Dhaka.jpg"
                        alt=""
                        className="w-full lg:h-[150px] object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col-reverse lg:flex-row  heebo border-t-4  border-dotted py-5 border-[#005689]">
                    <p className="font-semibold w-full lg:w-[25%]  hidden md:block">
                      <div className="flex gap-4">
                        <IoMdTime className="text-lg" />
                        <span>10-23-2024</span>
                      </div>
                    </p>
                    <div className="w-full lg:w-[50%] lg:pr-6">
                      <div className="flex items-center">
                        <p className="text-[#005689] mb-2 mt-3 md:mt-0">
                          Author : Naimul
                        </p>
                      </div>

                      <h2 className=" font-bold">
                        Festivals of Dhaka: A Celebration of Culture
                      </h2>

                      <p className="text-justify my-1 heebo text-[15px]">
                        Born poor in colonial India and dead at 32, Ramanujan
                        had fa...
                      </p>

                      <div className="mt-2 flex justify-between items-center">
                        <ReadMoreLink
                          news={
                            "https://en.wikipedia.org/wiki/Culture_of_Dhaka#Festivals"
                          }
                        ></ReadMoreLink>
                      </div>
                    </div>
                    <div className="w-full lg:w-[25%] flex  items-center">
                      <img
                        src="https://thegreenpagebd.com/wp-content/uploads/2022/08/In-five-cities-of-Bangladesh-including-Dhaka-the-environment-is-rapidly-destroyed.jpg"
                        alt=""
                        className="w-full lg:h-[150px] object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col-reverse lg:flex-row  heebo border-t-4  border-dotted py-5 border-[#005689]">
                    <p className="font-semibold w-full lg:w-[25%]  hidden md:block">
                      <div className="flex gap-4">
                        <IoMdTime className="text-lg" />
                        <span>10-23-2024</span>
                      </div>
                    </p>
                    <div className="w-full lg:w-[50%] lg:pr-6">
                      <div className="flex items-center">
                        <p className="text-[#005689] mb-2 mt-3 md:mt-0">
                          Author : Naimul
                        </p>
                      </div>

                      <h2 className=" font-bold">
                        Festivals of Dhaka: A Celebration of Culture
                      </h2>

                      <p className="text-justify my-1 heebo text-[15px]">
                        Born poor in colonial India and dead at 32, Ramanujan
                        had fa...
                      </p>

                      <div className="mt-2 flex justify-between items-center">
                        <ReadMoreLink
                          news={
                            "https://en.wikipedia.org/wiki/Culture_of_Dhaka#Festivals"
                          }
                        ></ReadMoreLink>
                      </div>
                    </div>
                    <div className="w-full lg:w-[25%] flex  items-center">
                      <img
                        src="https://www.evercarebd.com/wp-content/themes/wp-bootstrap-starter-child/asset/img/Evercare-Dhaka-scaled.jpeg"
                        alt=""
                        className="w-full lg:h-[150px] object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <UserAddedNews categoryNews={categoryNews}></UserAddedNews>
      </div>
    </div>
  );
};

export default CategoriesNews;
