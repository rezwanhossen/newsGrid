import FeaturedSection from "./FeaturedSection/FeaturedSection";
import Banner from "./Banner/Banner/Banner";
import Sponsors from "./Sponsors/Sponsors";
import Another from "./AnotherNews/Another";
import News from "../Pages/News/News";

const Home = () => {
  return (
    <div>
      
      <Banner />
      <News></News>
      <Sponsors></Sponsors>
      <Another></Another>
      {/* <FeaturedSection></FeaturedSection> */}
      {/* <Sports></Sports> */}
    </div>
  );
};

export default Home;
