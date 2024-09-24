import React from 'react';


const TwoColumnLayout = ({data}) => {
    
    
    return (
        <>
            <div className="grid grid-cols-2 gap-4 border-b border-current mb-10">
            {data?.map((news , index) => {
                return(
                    
                        <div className={`${index === 0 ? 'border-r border-current pr-6' : index === 1 ? 'pl-2' : ''} pb-3`}>
                            <div className="h-[373px]">
                                

                                
                                <img src={news?.image} alt=""className="h-full" />
                            </div>
                            {/* content */}
                            <div className="font-sans">
                                <h3 className="text-lg text-blue-700 bg-base-300 rounded font-semibold inline-block  px-2 mt-2">{news?.category}</h3>
                                <h2 className="text-2xl font-bold hover:underline">{news?.title}</h2>
                            </div>
                    </div>
                    

                    )
            })}   
                </div>     
        </>
    );
};

export default TwoColumnLayout;