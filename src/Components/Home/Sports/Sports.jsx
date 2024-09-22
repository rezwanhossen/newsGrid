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
        <div className="container mx-auto px-4 md:px-0 mb-16">
            <div className=' font-serif  mb-10'>
                    <h1 className="text-4xl font-bold text-center">Sports</h1>
                    <p className='max-w-5xl mx-auto mt-2 text-center'>Sport covers a range of activities performed within a set of rules and undertaken as part of leisure or competition.Sporting activities involve physical activity carried out by teams.</p>
            </div>


            <div className='flex flex-col lg:flex-row gap-4'>
                
                    {/* content left side */}
                <div className='w-full lg:w-[45%] '>
                        <div  className="space-y-3">
                        {
                    sports?.map(sport => <div className="flex flex-col lg:flex-row  border lg:h-[200px]  p-3 gap-4 hover:bg-sky-900 hover:text-white hover:border-r-8 hover:border-r-cyan-600 rounded-lg">
                        
                        <div className="w-full lg:w-[350px] h-full">
                            <img src={sport?.image} alt="" className="h-full rounded-lg" />
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
                <div className='w-full lg:w-[55%] h-[410px]'>
                    
                    <iframe width="100%" height="410" className="rounded-lg" src="https://www.youtube.com/embed/Tu2Wk_s1Zwk?si=4N7Mbth2GJ_yVQdw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                

            </div>
        </div>
    );
};

export default Sports;