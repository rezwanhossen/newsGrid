
// import Banner from "./Banner/Banner/Banner";
import Sponsors from "./Sponsors/Sponsors";
import Another from "./AnotherNews/Another";
import News from "../Pages/News/News";
import Loading from "../Loading/Loading";
import Banner from "./Banner/Banner/Banner";
import useNews from "../../hooks/useNews";
import TrendingNews from "./TrendingNews/TrendingNews";



const Home = () => {
    const [newsData , isLoading] = useNews();

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="mt-[210px] lg:mt-[170px] mb-[100px]">
        <Banner newsData={newsData} />
        <News newsData={newsData}></News>
        <Sponsors></Sponsors>
        <Another newsData={newsData}></Another>
        <TrendingNews></TrendingNews>
      </div>
      
    </div>
  );

};

export default Home;
