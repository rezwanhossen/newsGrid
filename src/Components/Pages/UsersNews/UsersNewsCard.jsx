import React from 'react';
import ReadMoreLink from '../../../Shared/ReadMoreLink';

const UsersNewsCard = ({news}) => {
    return (
         <div className=" bg-white rounded transition-all duration-500 transform hover:scale-105 overflow-hidden shadow-md shadow-gray-700">
            <div className="   relative ">
                <div className="w-full h-[166px]">
                <img src={news?.urlToImage || news?.image || news?.image_url || news?.url_image} alt="" className='h-full  object-cover w-full '/>
                </div>

                <div className=' p-5 space-y-3   heebo '>
                    <h3 className="text-xl text-[#4A4A4A] font-medium">{news?.title.slice(0 , 35)}...</h3>
                    <p className="text-lg">{news?.description?.slice(0 , 100)}...</p>
                    <ReadMoreLink news={news}></ReadMoreLink>
                </div>
                

            </div>

            

            
        </div>
    );
};

export default UsersNewsCard;