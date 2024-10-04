import React from 'react';
import useNews from '../../../hooks/useNews';
import ReadMoreLink from '../../../Shared/ReadMoreLink';

const RightSide = ({newsData}) => {
    

    return (
        <>
            {/* right side */}
            <div>
                {
                    newsData?.slice(35 , 42).map(news => {
                        return(
                            <div className="py-4  border-t border-b border-dashed border-gray-500 mx-4 lg:mx-0">
                                <div className="flex  ">
                                    
                                    <div className="px-3">
                                        <p className="text-red-500 mb-2">Author : {news?.author?.slice(0 , 20)}...</p>
                                        <h2 className="text-lg font-bold">{news?.title.slice(0 , 70)}...</h2>
                               


                                        <div className="mt-2">
                                        <ReadMoreLink  news={news}></ReadMoreLink>
                                        </div>
                                    </div>
                                    
                
                                </div>
                        </div>
                        )
                    })
                }
            
            </div>
            <div className='h-[292px] mt-3'>
                <img src="https://static.foxbusiness.com/foxbusiness.com/content/uploads/2022/01/Beijing-olympics-sponsors.gif" alt=""className="h-full w-full object-cover" />
            </div>
        </>
    );
};

export default RightSide;