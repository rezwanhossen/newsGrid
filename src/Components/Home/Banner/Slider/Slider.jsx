import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const Slider = ({ newsData = [] }) => {
    // Handle case where no news data is provided or empty
    if (!newsData || newsData.length === 0) {
        return <p>No news available at the moment.</p>;
    }

    return (
        <>
            <Carousel 
                autoPlay 
                infiniteLoop 
                showThumbs={false} 
                showStatus={false} 
                interval={5000} // Adjust interval time for autoplay
                className="news-carousel"
            >
                {newsData.slice(0, 4).map((news, index) => (
                    <div key={index} className="relative h-[450px] lg:rounded-lg">
                        {/* Image display with fallback */}
                        {news?.urlToImage ? (
                            <img 
                                src={news.urlToImage} 
                                className="h-full w-full object-cover lg:rounded-lg" 
                                alt={news.title || "News image"} 
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gray-300 lg:rounded-lg">
                                <p className="text-gray-700">Image not available</p>
                            </div>
                        )}

                        {/* Content overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-r from-black to-transparent px-5 py-6 rounded-b-lg">
                            <div className="text-white">
                                <h1 className="text-xl font-semibold mb-2">
                                    {news?.title || "No title available"}
                                </h1>
                                <p className="text-base">
                                    {news?.description?.slice(0, 70) || "No description available..."}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </>
    );
};

export default Slider;
