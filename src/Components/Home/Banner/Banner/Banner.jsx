import { useState } from "react";
import Card from "../../../../Shared/Card";
import Slider from "../Slider/Slider";

const Banner = ({ newsData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Calculate the data for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedNews = newsData?.slice(10 + startIndex, 10 + startIndex + itemsPerPage);

    // Check if there's more news to show
    const hasMoreNews = newsData?.length > 10 + startIndex + itemsPerPage;

    const handleNextPage = () => {
        if (hasMoreNews) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <div className=" py-10">
                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Carousel: Full width */}
                    <div className="w-full">
                        <Slider newsData={newsData} />

                        {/* 3-column card layout with pagination */}
                        <div className="lg:mx-0 mt-4">
                            <div className=" ">
                                <h2 className="text-2xl md:text-3xl border-b-4 pb-4 border-red-500 font-bold">Latest News</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 lg:gap-8">
                                {
                                    selectedNews?.map((news, index) => (
                                        <Card key={index} news={news} />
                                    ))
                                }
                            </div>

                            {/* Pagination: Show "Next" button if there are more news items */}
                            {hasMoreNews && (
                                <div className="flex justify-end mt-4">
                                    <button 
                                        onClick={handleNextPage} 
                                        className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                                    >
                                        <span>Show More</span>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 ml-2" 
                                            viewBox="0 0 20 20" 
                                            fill="currentColor"
                                        >
                                            <path 
                                                fillRule="evenodd" 
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 000 2h4a1 1 0 100-2H9z" 
                                                clipRule="evenodd" 
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
