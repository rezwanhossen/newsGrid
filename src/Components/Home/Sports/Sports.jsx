import React, { useEffect, useState } from 'react';

const Sports = () => {
        const [sports , setSports] = useState([])
        useEffect(() => {
                fetch('/newsData.json')
                .then(res => res.json())
                .then(data => {
                    const filter = data.filter(news => news.category === 'Sports')
                    setSports(filter)
                })
        } ,[])


    return (
        <div className="container mx-auto px-4 md:px-0  h-screen">
            <div className='flex text-2xl font-bold font-serif justify-between mb-10 items-center'>
                    <h1 className="text-4xl font-bold">Sports</h1>
                    <h3 className="text-3xl   text-emerald-700">________________________________________</h3>
            </div>


            <div className='flex gap-4'>
                {/* left side content */}
                
                <div className='w-[45%] '>
                        <div  className="space-y-3">
                        {
                    sports?.map(sport => <div className="flex  border h-[200px]  p-3 gap-4 hover:bg-sky-900 hover:text-white hover:border-r-8 hover:border-r-cyan-600 rounded-lg">
                        
                        <div className="w-[350px] h-full">
                            <img src={sport?.image} alt=""className="h-full rounded-lg" />
                        </div>
                        <div className='space-y-2'>
                            <h1 className="text-xl font-semibold font-serif">{sport?.websitename}</h1>
                            <h1 className=' font-serif'>{sport?.title}</h1>
                            <a
                                href={sport.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-500 underline hover:text-white transition duration-300"
                            >
                                Read more
                            </a>
                        </div>
                        
                    </div>)
                }
                        </div>
                </div>
                <div className='w-[55%] h-[410px]'>
                    
                    <iframe width="100%" height="410" className="rounded-lg" src="https://www.youtube.com/embed/Tu2Wk_s1Zwk?si=4N7Mbth2GJ_yVQdw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                

            </div>
        </div>
    );
};

export default Sports;