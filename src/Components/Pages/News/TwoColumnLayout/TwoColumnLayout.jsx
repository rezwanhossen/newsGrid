import React from 'react';
import { Link } from 'react-router-dom';


const TwoColumnLayout = ({data}) => {
    
    
    return (
        <>
            <div className="grid  grid-cols-1 lg:grid-cols-2 gap-4 border-b border-current mb-10">
            {data?.map((news , index) => {
                return(
                    
                        <div className={`${index === 0 ? 'lg:border-r border-current lg:pr-6' : index === 1 ? 'lg:pl-2' : ''} pb-3 mx-4 lg:mx-0`}>
                            <div className="h-[373px]">
                                

                                
                                <img src={news?.urlToImage} alt=""className="h-full w-full object-cover rounded-lg lg:rounded-none" />
                            </div>
                            {/* content */}
                            <div className="">
                                <h3 className="text-lg text-blue-700 bg-base-300 rounded font-semibold inline-block  px-2 mt-2">{news?.category}</h3>
                                <h2 className="text-xl lg:text-2xl font-bold">{news?.title}</h2>
                                <Link to={news?.url} target='_blank' className="text-red-400 hover:underline  mt-3 font-semibold ">Read More...</Link>
                            </div>
                    </div>
                    

                    )
            })}   
                </div>     
        </>
    );
};

export default TwoColumnLayout;