import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from '../../../Shared/Card';

const NewsSearch = () => {

    const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };

  console.log("searchResults" , searchResults);
    return (
        <div className="container mx-auto mt-48 mb-20">

            


            {
                          searchResults?.length > 0 ? 
                          <div>
                                    <h1 className="text-3xl mb-6 font-bold heebo">Your Search News</h1>
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                          {
                               searchResults?.map(news => <Card news={news}></Card>)
                              
                          }
                  </div> 
                          </div>
                          : <div className= "px-8 py-3 text-center my-10  flex justify-center">
                            <div>
                            <h1 className="text-3xl font-bold mb-4">Sorry  No News found</h1>
                            <Link to="/"className='text-[#005689] text-xl heebo font-bold underline'>Back To Home</Link>
            
            <div className=" mx-auto rounded-xl">
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgwfdPYGzbsKc3NPMtKVF-Jd7JLkVQU_OuGJIvPCqtH-G-Hw1joSiRdVBZKv9rMcfCFWiENy02Ba85I_CbKZjJDqcLBqE5OZRKyk78aN40Qq0qGiHREjpKGgcnxUilh3lZVi9i6cVxEWpz0/s1600/giphy.gif" alt="nai" />
            </div>
            
                            </div>
        </div>
            }
            


            
        </div>
    );
};

export default NewsSearch;