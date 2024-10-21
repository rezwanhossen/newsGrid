import React, { useState } from 'react';

import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Card from '../../../Shared/Card';
import Loading from '../../Loading/Loading';
import UsersNewsCard from './UsersNewsCard';
import ReadMoreLink from '../../../Shared/ReadMoreLink';

const UsersNews = () => {
    const [menuValue , setMenuValue] = useState('3')
    const axiosPublic = useAxiosPublic();
    const {data : myNews = [] , isLoading} = useQuery({
        queryKey : ['usersNews'],
        queryFn : async() => {
                const news = await axiosPublic.get('/myNews')
                console.log(news?.data);
                return news?.data
        }
    });


    const handleMenu = (value) => { 
            setMenuValue(value)
    }

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className="bg-base-200">
            
            <div className="border-4">

            <div className="heebo mt-10">
                <h1 className="text-2xl font-semibold text-center py-4 bg-white">Home / Users News  </h1>
            </div>
                    <div  className='mt-10 container mx-auto flex gap-8 pb-16'>
                    <div className="bg-white w-[400px] h-[330px] rounded p-5">
                        <h1 className="text-xl font-bold border-b-2 border-[#005689] pb-2">News By Categories</h1>

                        <div className="space-y-3 mt-4 uppercase">
                            {
                                myNews?.map(news => <li className="text-lg heebo font-semibold hover:cursor-pointer">{news?.category}</li>)
                            }
                        </div>

                    </div>
                    <div className="w-full">
                    <div className="flex flex-col md:flex-row justify-center md:justify-between mx-3 md:mx-0 md:px-6 py-4 rounded bg-white   items-center  mb-10">
          <h1 className="text-xl md:text-2xl    font-bold heebo text-[#4A4A4A] ">
            News
          </h1>

          <div className="flex flex-row-reverse md:flex-row  lg:gap-10 items-center">
            <div className="flex items-center gap-4">
              
              <div className="hover:cursor-pointer hidden lg:block">
                <img
                  src="https://departmental-store-02.web.app/images/gr3.svg"
                  alt="nai"
                  className="w-[40px] h-[40px] bg-base-200 p-2 rounded"
                  onClick={() => handleMenu("3")}
                />
              </div>
              <div className="hover:cursor-pointer hidden lg:block">
                <img
                  src="https://departmental-store-02.web.app/images/gr2.svg"
                  alt="nai"
                  className="w-[40px] h-[40px] bg-base-200 p-2 rounded"
                  onClick={() => handleMenu("2")}
                />
              </div>
              <div className="hover:cursor-pointer hidden lg:block">
                <img
                  src="https://departmental-store-02.web.app/images/gr.svg"
                  alt="nai"
                  className="w-[40px] h-[40px] bg-base-200 p-2 rounded"
                  onClick={() => handleMenu("1")}
                />
              </div>
            </div>

            
          </div>
        </div>
                        <div className={`grid grid-cols-${menuValue} gap-8`}>
                            {
                                myNews?.map(news => news?.status === 'approved' &&  menuValue === "1" ?  <div className="mx-4 md:mx-0 bg-white transition-all duration-500 transform hover:scale-105 overflow-hidden lg:h-[252px] shadow-md shadow-gray-700">
                                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 md:h-full   relative ">
                                      <div className="w-full lg:w-[35%] h-[220px] lg:h-full p-3 rounded">
                                        <img
                                          src={
                                            news?.urlToImage ||
                                            news?.image ||
                                            news?.image_url ||
                                            news?.url_image
                                          }
                                          alt=""
                                          className="h-full  object-cover w-full "
                                        />
                                      </div>
                  
                                      <div className="space-y-3 p-5 lg:w-[65%]   heebo ">
                                        <h3 className="text-lg md:text-xl text-[#4A4A4A] font-medium">
                                          {news?.title.slice(0, 30)}...
                                        </h3>
                                        <p className="text-lg font-bold">
                                          Published Date :{" "}
                                          <span className="bg-[#005689] text-white px-2 rounded">
                                            {news?.publishedAt.slice(0, 10)}
                                          </span>
                                        </p>
                                        <p className="text-lg hidden md:block text-[#4A4A4A]">
                                          {news?.description.slice(0, 60)}
                                        </p>
                                        <ReadMoreLink news={news}></ReadMoreLink>
                                      </div>
                                    </div>
                                  </div> : <Card news={news}></Card>)
                            }
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    );
};

export default UsersNews;