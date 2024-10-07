import Sponsors from "./Sponsors/Sponsors";
import Loading from "../Loading/Loading";
import Banner from "./Banner/Banner/Banner";
import useNews from "../../hooks/useNews";
import TrendingNews from "./TrendingNews/TrendingNews";
import BreakingNews from "./BreakingNews/BreakingNews";
import FollowUs from "./FollowUs/FollowUs";
import RecommendedNews from "./RecommendedNews/RecommendedNews";

const Home = () => {
    const [newsData, isLoading] = useNews();

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div className="mx-auto container py-6 px-4 lg:px-0">
            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Section: Banner and Trending News */}
                <div className="w-full lg:w-[70%]">
                    {/* Banner */}
                    <Banner newsData={newsData} />

                    {/* Trending News */}
                    <TrendingNews />

                    {/* Recommended News */}
                    <RecommendedNews />
                </div>
                
                {/* Right Section: Breaking News, Sponsor, Follow Us */}
                <div className="w-full lg:w-[30%] p-2 flex flex-col gap-6">
                    {/* Breaking News */}
                    <BreakingNews />

                    {/* Sponsor Section */}
                    <Sponsors />

                    {/* Follow Us Section */}
                    <FollowUs />
                </div>
            </div>
        </div>
    );
};

export default Home;
