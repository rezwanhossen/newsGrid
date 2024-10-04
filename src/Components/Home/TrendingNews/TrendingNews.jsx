import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBookmark, FaShareAlt } from 'react-icons/fa';
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
    const navigate = useNavigate();
    const apiKey = 'uX-Tbv7wo0kWPez-lDxwvpryFy8240yUQek_C5a_qIYVl6kb';

    // Fetch news articles from the GNews API
    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.currentsapi.services/v1/trending-news', {
                params: {
                    token: apiKey,
                    lang: 'en',
                    max: 10,
                },
            });
            setArticles(response.data.articles.slice(0, 9));
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch news. Please try again later.');
            setLoading(false);
            console.log(error);
        }
    };

    // Bookmark article
    const handleBookmark = (article) => {
        const isLoggedIn = localStorage.getItem("userToken");
        if (!isLoggedIn) {
            Swal.fire({
                title: "Not Logged In!",
                text: "You need to log in to bookmark this article.",
                icon: "warning",
                confirmButtonText: "Login", 
                preConfirm: () => {
                    navigate("/login"); 
                },
            });
            return; 
        }

        const { url, title, image } = article;
        const email = "user@example.com";
        const bookmarkData = { url, title, image, email };

        fetch("http://localhost:5000/bookmarks", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(bookmarkData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "News successfully added to bookmarks",
                        icon: "success",
                        confirmButtonText: "Ok",
                    });
                } else {
                    toast.error("Failed to bookmark. Please try again.");
                }
            })
            .catch((err) => console.error("Error bookmarking article:", err));
    };

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) return <div className="text-center text-lg">Loading news...</div>;
    if (error) return <div className="text-center text-lg text-red-500">{error}</div>;

    return (
        <div className="mx-auto container px-4 py-8">
            <h1 className="text-4xl font-extrabold mb-10">Trending & Most Popular News</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className="relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
                    >
                        {/* Image Section */}
                        {article.image && (
                            <div className="relative">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-60 object-cover rounded-t-lg"
                                />
                                {/* Floating Trending Badge */}
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold py-1 px-3 rounded-full shadow-lg">
                                    Trending
                                </div>
                            </div>
                        )}

                        {/* Card Content */}
                        <div className="p-6 rounded-b-lg">
                            <h2 className="font-bold text-2xl text-gray-900 leading-tight mb-3">{article.title}</h2>
                            <p className="text-sm text-gray-600 mb-4">{article.description}</p>

                            {/* Share and Bookmark Buttons */}
                            <div className="flex justify-between items-center">
                                <a
                                    href={article.url}
                                    className="text-indigo-600 font-semibold hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read more
                                </a>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                {/* Social Sharing Icons */}
                                <div className="flex items-center gap-3">
                                    <FaShareAlt className="text-gray-600" />
                                    <FacebookShareButton url={article.url} className="hover:scale-110 transition-transform">
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                    <TwitterShareButton url={article.url} className="hover:scale-110 transition-transform">
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>
                                    <LinkedinShareButton url={article.url} className="hover:scale-110 transition-transform">
                                        <LinkedinIcon size={32} round />
                                    </LinkedinShareButton>
                                </div>

                                {/* Bookmark Button */}
                                <button
                                    onClick={() => handleBookmark(article)}
                                    className="flex items-center text-gray-600 hover:text-pink-500 transition-colors"
                                >
                                    <FaBookmark className="mr-1" /> Bookmark
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingNews;
