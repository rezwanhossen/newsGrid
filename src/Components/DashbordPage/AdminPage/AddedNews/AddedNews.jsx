import {  useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { FaTrashAlt, FaUser } from 'react-icons/fa';
import ReadMoreLink from '../../../../Shared/ReadMoreLink';
import { IoMdTime } from 'react-icons/io';

const AddedNews = () => {
    const axiosSecure = useAxiosSecure();
    const {data : addedNews = [] , refetch} = useQuery({
        queryKey : ['addedNews'],
        queryFn : async() => {
            const res = await axiosSecure.get('/myNews');

            console.log(res?.data);
            
            return res.data;
        }
    })

    const handleNewsUpdate = ({news , status}) => {
        // console.log(id , status);
        axiosSecure.patch(`/myNews/${status}` , news)
        .then(res => {
            console.log(res.data)
            refetch()
        })
        .catch(error => {
            console.error(error);
        })
    }
    return (
        <div className='heebo'>
          {/* add news */}
                <h1 className="text-2xl font-bold my-5 text-[#005689]">Added News </h1>
                
                
                



            <div>
                {
                    addedNews?.map(news => <div key={news?._id} className="py-4  border-t border-b border-dashed border-gray-500 mx-4 lg:mx-0">
                        {/* left side nav */}
                        <div className="flex flex-col-reverse lg:flex-row  heebo">
                          <p className="font-semibold w-full lg:w-[15%]  flex  gap-4">
                            <IoMdTime className="text-lg"/>{news?.publishedAt.slice(0 , 10)}
                          </p>
                          <div className="w-full lg:w-[55%] lg:pr-6">
                            <div className="flex items-center gap-4 mb-3">
                            <p className="text-[#005689] mb-2">
                              Author : {news?.author?.slice(0, 20)}...
                            </p>
                            <div >
                            {/* <p className="font-bold">User Name : {news?.userName}</p> */}
                            <p className="font-bold">{news?.email}</p>
                            </div>

                            </div>
          
                            <h2 className=" font-bold">
                              {news?.title.slice(0, 50)}...
                            </h2>
                            
          
                            
                            <p className="text-justify my-1 heebo text-[15px]">{news?.description?.slice(0, 100)}...</p>
          
                            <div className="mt-2 flex justify-between items-center">
                              <ReadMoreLink news={news}></ReadMoreLink>
                              <div className="flex items-center gap-3">
                                <h2 className="font-bold">Status : {news?.status}</h2>

                                {
                                    news?.status === 'approved' ? <button className="btn btn-sm bg-[#1f6892] text-white hover:bg-[#47728b]"disabled>Approved</button> :
                                    <button className="btn btn-sm bg-[#1f6892] text-white hover:bg-[#47728b]"onClick={() => handleNewsUpdate({news , status : "approved"})}>Approved</button>
                                }
                                {
                                    news?.status === 'rejected' ? <button className="btn btn-sm bg-red-700 hover:bg-red-800 text-white" disabled>Rejected</button>
                                    : 
                                    <button className="btn btn-sm bg-red-700 hover:bg-red-800 text-white" onClick={() => handleNewsUpdate({news , status : "rejected"})}>Rejected</button>
                                }
                                
                              </div>

                            </div>
                          </div>
                          <div className="w-full lg:w-[30%] flex  items-center">
                            <img
                              src={news?.urlToImage}
                              alt=""
                              className="w-full lg:h-[150px] object-cover"
                            />
                          </div>
                        </div>
                      </div>)
                }
            </div>
        </div>
    );
};

export default AddedNews;