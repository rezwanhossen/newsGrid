
import React, { useEffect } from 'react';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
const Slider = ({newsData}) => {

    
    return (
        <>
              <Carousel>
                {
                    newsData?.slice(0,4).map(news => {
                        return(
                            <div className="relative h-[450px] rounded-lg">
                    <img src={news?.urlToImage}className='h-full object-cover rounded-lg'alt="nai" />

                    {/* content */}
                    <div className='absolute text-left px-5 bg-gradient-to-r from-[#151515] to-[rgba(21 , 21, 21 , 0)]   py-6 w-full rounded-b-lg bottom-0'>
                        <div className='text-white heebo'>
                        <h1 className="text-xl font-semibold">{news?.title}</h1>
                        <p className="text-base">{news?.description?.slice(0, 70)}</p>
                        {/* <p className="text-lg">{news?.publishedAt}</p> */}
                        </div>

                    </div>
                    
                </div>
                        )
                    })
                }
                
                
                
               
            </Carousel>
        </>
    );
};

export default Slider;

