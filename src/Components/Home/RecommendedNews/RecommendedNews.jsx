import { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendedNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const apiKey = 'pub_5554319d28e13bc8be1aab4736ea6ca4bbb0c'; // NewsData.io API Key

    // Fetch recommended news from NewsData.io API
    const fetchRecommendedNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://newsdata.io/api/1/news', {
                params: {
                    apikey: apiKey,
                    country: 'us',      
                    category: 'entertainment', 
                    language: 'en',     
                },
            });
            setArticles(response.data.results.slice(0, 10));
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch recommended news. Please try again later.');
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRecommendedNews();
    }, []);

    if (loading) return <div className="text-center text-lg">Loading recommended news...</div>;
    if (error) return <div className="text-center text-lg text-red-500">{error}</div>;

    // Function to show more articles
    const handleShowMore = () => {
        setShowAll(true);
    };

    // Only show 2 articles by default, show all when "Show More" is clicked
    const displayedArticles = showAll ? articles : articles.slice(0, 3);

    return (
        <div className="py-8">
            <h1 className="text-4xl border-b-4 pb-4 border-red-500 font-extrabold mb-6">Recommended News</h1>
            {/* News list, two items by default */}
            <div className="grid grid-cols-1 mt-5 gap-6">
                {displayedArticles.map((article, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white shadow rounded-lg">
                        {/* Image */}
                        {article.image_url && (
                            <img
                                src={article.image_url}
                                alt={article.title}
                                className="w-40 h-28 object-cover rounded-lg"
                            />
                        )}

                        {/* Content */}
                        <div className="flex-1">
                            <h2 className="font-bold text-xl text-gray-900 mb-2">{article.title}</h2>
                            <p className="text-gray-600 text-sm mb-2">{article.description}</p>
                            <a
                                href={article.link}
                                className="text-orange-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show more button */}
            {!showAll && articles.length > 2 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleShowMore}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecommendedNews;
