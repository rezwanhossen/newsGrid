import React from 'react';
import Marquee from "react-fast-marquee";

const Sponsors = () => {
    return (
        <div className="my-16 mx-2 md:mx-0">
            <div>
                    <h1 className='text-3xl font-semibold text-center font-serif mb-5'>Sponsored By</h1>
            </div>
            <Marquee className="container  mx-auto shadow-lg shadow-slate-500 border py-6">
            <div className='flex items-center gap-16'>
            <div className="w-32 md:w-44">
                    <img src="https://www.react-fast-marquee.com/static/media/microsoft.4a9a93f0.png" alt="" />
            </div>
            <div className="w-32 md:w-44">
                    <img src="https://www.react-fast-marquee.com/static/media/ibm.bcec6b9a.png" alt="" />
            </div>
            <div className="w-32 md:w-44">
                    <img src="https://www.react-fast-marquee.com/static/media/dell.09332c44.png" alt="" />
            </div>
            <div className="w-32 md:w-44">
                    <img src="https://www.react-fast-marquee.com/static/media/pennsylvania.8c9f4108.png" alt="" />
            </div>
            <div className="w-32 md:w-44">
                    <img src="https://www.react-fast-marquee.com/static/media/nasa.3bf5af29.png" alt="" />
            </div>
            </div>
</Marquee>
        </div>
    );
};

export default Sponsors;