

import React from 'react';
import ReadMoreLink from './ReadMoreLink';


const Card = ({news}) => {
    return (
        <div className=" bg-white transition-all duration-500 transform hover:scale-105 overflow-hidden">
            <div className="   relative ">
                <div className="w-full h-[166px]">
                <img src={news?.urlToImage} alt="" className='h-full  object-cover w-full '/>
                </div>

                <div className=' p-5   heebo '>
                    <h3 className="text-[15px] font-medium">{news?.title.slice(0 , 45)}...</h3>
                    <ReadMoreLink news={news}></ReadMoreLink>
                </div>
                

            </div>

            

            
        </div>
    );
};

export default Card;