import React from 'react';
import useNews from '../../../hooks/useNews';
import ReadMoreLink from '../../../Shared/ReadMoreLink';

const RightSide = () => {
    const [newsData] = useNews();

    return (
        <>
            {/* right side */}
            <div>
                {
                    newsData?.slice(56 , 95).map(news => {
                        return(
                            <div className="py-4  border-t border-b border-dashed border-gray-500">
                                <div className="flex  font-sans">
                                    
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
        </>
    );
};

export default RightSide;