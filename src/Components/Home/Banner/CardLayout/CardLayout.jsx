
import React, { useEffect, useState } from 'react';
import Card from '../../../../Shared/Card';
import ReadMoreLink from '../../../../Shared/ReadMoreLink';

import { IoMdTime } from "react-icons/io";
import CardOne from './CardOne';

const CardLayout = ({newsData}) => {
    
        return (
        <div className="grid grid-cols-1 mx-3  lg:mx-0">
            {
                newsData?.slice(4 ,5).map(singleNews => <CardOne news={singleNews}></CardOne>)
            }


{/* card right side */}
            <div className="bg-white rounded-lg">
                <div className="py-4 px-5  flex items-center text-lg font-semibold text-[#005689] mb-4 gap-3 border-b-2 border-b-[#005689] ">
                  <IoMdTime /> Recent 
                </div>

                {
                    newsData?.slice(5 , 9).map(news => {
                        return (
                            <div className="flex items-center gap-4 mb-4 pb-[15px] border-b border-[#ededed] px-3">
                
                <div className='w-[70px] h-[70px]'>
                    <img src={news?.urlToImage} alt="nai"className="w-full h-full" />
                </div>
                {/* content */}
                <div>
                    <h2 className="text-[#005689] text-xs font-bold uppercase">{news?.title?.slice(0 , 10)}</h2>
                    <p className="text-[15px] font-medium hover:text-[#005689]">{news?.description.slice(0 , 43)} </p>
                    <ReadMoreLink news={news}></ReadMoreLink>
                </div>
            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default CardLayout;

