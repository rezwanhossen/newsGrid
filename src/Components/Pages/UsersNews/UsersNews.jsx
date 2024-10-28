import React, { useEffect, useState } from 'react';
import UsersNewsCard from './UsersNewsCard';
import ReadMoreLink from '../../../Shared/ReadMoreLink';
import { IoMenuSharp } from "react-icons/io5";
import axios from 'axios';

const UsersNews = () => {
    
    const [menuValue, setMenuValue] = useState('3');
    const [categoryNews, setCategoryNews] = useState([]);
    const [allNews, setAllNews] = useState([]); 

    

    console.log("categoryNews" , categoryNews);
    

    
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://news-grid-server.vercel.app/mynews');
                setAllNews(response.data);
                setCategoryNews(response.data); 
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);
    const [category , setCategory] = useState();
    const [active  , setActive] = useState();
    
    const handleCategory = (category) => {
      
        if (category === 'allNews') {
            setCategoryNews(allNews); 
        } else {
            const filteredNews = allNews.filter(news => news?.category === category);
            setCategoryNews(filteredNews);
        }
    };

    const handleMenu = (value) => { 
        setMenuValue(value);
    }

    

    

    return (
        <div className="bg-base-200">
            <div className="border-4">
                <div className="heebo mt-[100px] lg:mt-10">
                    <h1 className="text-2xl font-semibold text-center py-4 bg-white">Home / Users News  </h1>
                </div>
                <div className='mt-10 container mx-auto flex flex-col lg:flex-row lg:gap-12 pb-16'>
                    <div>
                        <div className="sticky lg:top-36">
                            <div className="bg-white flex flex-row justify-between lg:justify-normal lg:flex-col mx-4 lg:mx-0 lg:w-[350px]  rounded p-5">
                                <h1 className="text-xl hidden lg:block font-bold lg:border-b-2 lg:border-[#005689] pb-2">News By Categories</h1>

                                {/* category */}
                                <div className="lg:space-y-3 mt-4 uppercase  lg:block list-none  flex flex-wrap justify-center items-center gap-4">
                                    <li onClick={() => handleCategory('allNews')} className={`text-lg heebo font-semibold hover:cursor-pointer`}>All News</li>
                                    
                                    <li onClick={() => handleCategory('science')} className={`text-lg heebo font-semibold hover:cursor-pointer`}>Science</li>
                                    <li onClick={() => handleCategory('entertainment')} className={`text-lg heebo font-semibold hover:cursor-pointer`}>Entertainment</li>
                                    <li onClick={() => handleCategory('business')} className={`text-lg heebo font-semibold hover:cursor-pointer`}>Business</li>
                                    <li onClick={() => handleCategory('technology')} className={`text-lg heebo font-semibold hover:cursor-pointer`}>Technology</li>
                                </div>
                                <div>
                                                       
                                </div>
                            </div>
                            <div className="w-[350px] mt-4 hidden lg:block">
                                <h1 className="text-2xl rounded heebo bg-white py-4 font-bold px-3 mb-3">Sponsors</h1>
                                <img src="https://katieloxton.com/media/wysiwyg/wwdw-bag-gif.gif" className="w-full rounded h-[400px] object-cover" alt="sponsor" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col  lg:flex-row justify-center items-center md:justify-between mx-3 md:mx-0 md:px-6 py-4 rounded  lg:bg-white  mb-10">
                           <div className="hidden lg:block  w-full">
                                    <div className="flex justify-between items-center w-full">
                                         <h1 className="text-xl md:text-2xl font-bold heebo text-[#4A4A4A]">News</h1>
                            <div className="flex flex-row-reverse md:flex-row lg:gap-10 items-center">
                                <div className="flex items-center gap-4">
                                    <div className="hover:cursor-pointer hidden lg:block">
                                        <img src="https://departmental-store-02.web.app/images/gr3.svg" alt="nai" className="w-[40px] h-[40px] bg-base-200 p-2 rounded" onClick={() => handleMenu("3")} />
                                    </div>
                                    <div className="hover:cursor-pointer hidden lg:block">
                                        <img src="https://departmental-store-02.web.app/images/gr2.svg" alt="nai" className="w-[40px] h-[40px] bg-base-200 p-2 rounded" onClick={() => handleMenu("2")} />
                                    </div>
                                    <div className="hover:cursor-pointer hidden lg:block">
                                        <img src="https://departmental-store-02.web.app/images/gr.svg" alt="nai" className="w-[40px] h-[40px] bg-base-200 p-2 rounded" onClick={() => handleMenu("1")} />
                                    </div>
                                </div>
                            </div>
                                    </div>
                           </div>
                        </div>
                        <div className="mx-4 lg:mx-0">
                        {
                            categoryNews?.length > 0 ?   <div className={`grid grid-cols-1 md:grid-cols-${menuValue} gap-8 -z-10`}>
                            {
                                categoryNews?.map(news => 
                                    news?.status === 'approved' && (
                                        menuValue === "1" ?  
                                            <div key={news.id} className="mx-4 md:mx-0 bg-white transition-all duration-500 transform hover:scale-105 overflow-hidden  lg:h-[252px] shadow-md shadow-gray-700">
                                                <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 md:h-full relative">
                                                    <div className="w-full lg:w-[35%] h-[220px] lg:h-full p-3 rounded relative">
                                                        <img src={news?.urlToImage || news?.image} alt="news" className="h-full object-cover w-full" />
                                                    <h1 className="text-lg text-white bg-[#005689] py-1 px-3 absolute top-6 font-bold right-6">{news?.category}</h1>
                                                    </div>
                                                    <div className="space-y-3 p-5 lg:w-[65%] heebo">
                                                        <h3 className="text-lg md:text-xl text-[#4A4A4A] font-medium">{news?.title.slice(0, 30)}...</h3>
                                                        <p>{news?.description.slice(0,100)}</p>
                                                        <p className="text-lg font-bold">Published Date : <span className="bg-[#005689] text-white px-2 rounded">{news?.publishedAt.slice(0, 10)}</span></p>
                                                        <ReadMoreLink news={news}></ReadMoreLink>
                                                    </div>
                                                </div>
                                            </div> 
                                        : <UsersNewsCard key={news.id} news={news} />
                                    )
                                )
                               
                            }
                        </div> : <div className= "px-8 py-3 flex justify-center text-center my-10  w-full">
                            <div>
                            <h1 className="text-2xl font-bold mb-4">Sorry ! No news found related this category</h1>
                            
                            <div className="max-w-sm mx-auto rounded-xl mt-6">
                            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgwfdPYGzbsKc3NPMtKVF-Jd7JLkVQU_OuGJIvPCqtH-G-Hw1joSiRdVBZKv9rMcfCFWiENy02Ba85I_CbKZjJDqcLBqE5OZRKyk78aN40Qq0qGiHREjpKGgcnxUilh3lZVi9i6cVxEWpz0/s1600/giphy.gif" alt="nai" />
                            </div>
                            </div>
                        </div>
                        }
                        </div>
                      
                    </div>
                    <div className="mx-4 mt-4 block lg:hidden">
                                <h1 className="text-2xl rounded heebo bg-white py-4 font-bold px-3 mb-3">Sponsors</h1>
                                <img src="https://katieloxton.com/media/wysiwyg/wwdw-bag-gif.gif" className="w-full rounded h-[400px] object-cover" alt="sponsor" />
                            </div>
                </div>
            </div>
        </div>
    );
};

export default UsersNews;