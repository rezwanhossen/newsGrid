

import React from 'react';
import ReadMoreLink from './ReadMoreLink';


const Card = ({news}) => {
    return (
        <div className="rounded-t-lg p-5 bg-white mb-4 rounded-lg">
            <div className="h-[270px] relative ">
                <img src={news?.urlToImage} alt="" className='h-full rounded-lg object-cover w-full '/>

                <div className='absolute p-2 bottom-0 text-white heebo bg-gradient-to-r from-[#151515] to-[rgba(21 , 21, 21 , 0)] rounded-b-lg'>
                    <h3 className="text-lg font-bold">{news?.title.slice(0 , 45)}...</h3>
                    <ReadMoreLink news={news}></ReadMoreLink>
                </div>
                

            </div>

            

            
        </div>
    );
};

export default Card;