import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBookmark } from 'react-icons/fa';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
} from 'react-share';
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const TrendingNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    

    const navigate = useNavigate();
    const apiKey = 'uX-Tbv7wo0kWPez-lDxwvpryFy8240yUQek_C5a_qIYVl6kb'; // Currents API token

    // Simulate logged-in user status (you can replace this with actual authentication logic)
    const isLoggedIn = false; // Change this to `true` if the user is logged in

    // Fetch news articles from the Currents API
    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.currentsapi.services/v1/latest-news', {
                params: {
                    apiKey: apiKey,
                    language: 'en',
                },
            });
            setArticles(response.data.news.slice(0, 10)); 
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch news. Please try again later.');
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) return <div className="text-center text-lg">Loading news...</div>;
    if (error) return <div className="text-center text-lg text-red-500">{error}</div>;

    // Function to show more articles
    const handleShowMore = () => {
        setShowAll(true);
    };

    // Function to handle bookmarking
    const handleBookmark = (article) => {
        if (!isLoggedIn) {
            Swal.fire({
                title: 'You need to be logged in!',
                text: 'Please log in to bookmark articles.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login'); 
                }
            });
        } else {
            // Example bookmark action using toast or any storage logic
            toast.success(`Bookmarked: ${article.title}`);
        }
    };

    // Only show 2 articles by default, show all when "Show More" is clicked
    const displayedArticles = showAll ? articles : articles.slice(0, 2);

    return (
        <div className=" p-5 bg-[#F5F5F5] rounded-lg">
            <h1 className="text-4xl text-[#3BAFDA] border-b-4 pb-4 border-[#007E7E] font-extrabold mb-6">Trending News</h1>
            {/* News list, two items by default */}
            <div className="grid grid-cols-1 mt-5 gap-6">
                {displayedArticles.map((article, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white shadow rounded-lg">
                        {/* Image */}
                        {article.image && (
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-40 h-28 object-cover rounded-lg"
                            />
                        )}

                        {/* Content */}
                        <div className="flex-1">
                            <h2 className="font-bold text-xl text-[#4A4A4A] mb-2">{article.title}</h2>
                            <p className="text-[#767676] text-sm mb-2">{article.description}</p>
                            <a
                                href={article.url}
                                className="text-[#FF9A8B] hover:text-[#00A6A6] hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Read more
                            </a>

                            {/* Social sharing icons */}
                            <div className="mt-4 flex items-center gap-4">
                                <span className="text-[#4A4A4A] font-bold">Share: </span>
                                <FacebookShareButton url={article.url}>
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <TwitterShareButton url={article.url}>
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                <LinkedinShareButton url={article.url}>
                                    <LinkedinIcon size={32} round />
                                </LinkedinShareButton>

                                {/* Bookmark icon with text */}
                                <button
                                    onClick={() => handleBookmark(article)}
                                    className="ml-4 flex items-center text-gray-600 hover:text-orange-500"
                                    aria-label="Bookmark"
                                >
                                    <FaBookmark size={24} className="mr-2" />
                                    Bookmark
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show more button */}
            {!showAll && articles.length > 2 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleShowMore}
                        className="px-4 py-2 bg-[#00A6A6] text-white rounded-md hover:bg-[#007E7E] transition"
                    >
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
};

export default TrendingNews;