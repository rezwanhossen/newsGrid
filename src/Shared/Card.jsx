

import React from 'react';
import ReadMoreLink from './ReadMoreLink';


const Card = ({news}) => {
    return (
        <div className="rounded-lg">
            <div className="h-[237px] relative rounded-lg">
                <img src={news?.urlToImage} alt="" className='h-full object-cover w-full rounded-lg'/>

                <div className='absolute p-2 bottom-0 text-white bg-black opacity-75 rounded-b-lg'>
                    <h3 className="text-lg font-bold">{news?.title.slice(0 , 45)}...</h3>
                    <ReadMoreLink news={news}></ReadMoreLink>
                </div>
                

            </div>
            

            
        </div>
    );
};

export default Card;