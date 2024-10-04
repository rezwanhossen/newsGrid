import Sponsors from "./Sponsors/Sponsors";
import Another from "./AnotherNews/Another";
import News from "../Pages/News/News";
import Loading from "../Loading/Loading";
import Banner from "./Banner/Banner/Banner";
import useNews from "../../hooks/useNews";
import TrendingNews from "./TrendingNews/TrendingNews";
import BreakingNews from "./BreakingNews/BreakingNews"; // Assuming BreakingNews is defined
import NewsSlider from "./NewSlider/NewSlider";
import LatestNews from "./LatestNews/LatestNews";
import FollowUs from "./FollowUs/FollowUs";

const Home = () => {
    const [newsData, isLoading] = useNews();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto mt-20">

            {/* Main Content and Sidebar */}
            <div className="lg:flex lg:gap-6 mt-6">
                {/* Main Content */}
                <div className="lg:w-2/3">
                    {/* Trending News Section */}
                    <section className="trending-news mb-12 bg-white shadow-lg p-6 rounded-lg">
                        <NewsSlider/>
                    </section>

                    {/* News Section */}
                    <section className="news-section mb-12 bg-white shadow-lg p-6 rounded-lg">
                        <LatestNews/>
                    </section>

                    {/* Trending News Section */}
                    <section className="trending-news mb-12 bg-white shadow-lg p-6 rounded-lg">
                        <TrendingNews />
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="lg:w-1/3 lg:pl-6">
                    {/* Breaking News */}
                    <section className="breaking-news mb-12 bg-red-50 shadow-lg p-6 rounded-lg">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Breaking News</h2>
                        <BreakingNews />
                    </section>

                    {/* Sidebar Sponsors */}
                    <section className="sidebar-sponsors bg-white shadow-lg p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Sponsored</h2>
                        <Sponsors />
                    </section>
                    {/* Sidebar Follow Us */}
                    <section className="sidebar-sponsors bg-white shadow-lg p-6 my-8 rounded-lg">
                        <FollowUs/>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Home;
