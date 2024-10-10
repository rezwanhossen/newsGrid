import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Compare = () => {
    const {keyword} = useParams()
    
    const [news , setNews] = useState();

    useEffect(() => {
        fetch("/newsData.json")
        .then(res => res.json())
        .then(data => {
            const filter = data.filter(news => news.keyword === keyword)
            setNews(filter)


        })
    })
    return (
        <div className="mt-[110px] mb-12">
              
                
              {
                news?.length > 1 ? 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                 news?.map(newsItem => <div key={newsItem.id} className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 relative">
                    <img
                        src={newsItem.image}
                        alt={newsItem.title}
                        className="w-full h-40 object-cover mb-4 rounded"
                    />
                    <h3 className="text-lg font-bold mb-2">{newsItem.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{newsItem.websitename}</p>
                   
                   <div className="space-x-4  absolute left-1/2 transform -translate-x-1/2 bottom-3">
                   <a
                        href={newsItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 underline hover:text-orange-700 transition duration-300"
                    >
                        Read more
                    </a>
               
                   </div>
                </div>
                ) 
            }
                </div>
                :
                <div className= "px-8 py-3 text-center my-10 border-2 border-red-600 w-full">
                    <h1 className="text-2xl font-bold mb-4">No data found related this news</h1>
                    
                    <div className="max-w-sm mx-auto rounded-xl">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgwfdPYGzbsKc3NPMtKVF-Jd7JLkVQU_OuGJIvPCqtH-G-Hw1joSiRdVBZKv9rMcfCFWiENy02Ba85I_CbKZjJDqcLBqE5OZRKyk78aN40Qq0qGiHREjpKGgcnxUilh3lZVi9i6cVxEWpz0/s1600/giphy.gif" alt="nai" />
                    </div>
                </div>
              }
              
        </div>
    );
};

export default Compare;