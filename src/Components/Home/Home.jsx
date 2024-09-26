import FeaturedSection from "./FeaturedSection/FeaturedSection";
import Banner from "./Banner/Banner/Banner";
import Sponsors from "./Sponsors/Sponsors";
import Sports from "./Sports/Sports";
import News from "../Pages/News/News";
const Home = () => {
  return (
    <div>
      <Banner />
      {/* <FeaturedSection></FeaturedSection> */}
      <News></News>

      <Sponsors></Sponsors>
      <Sports></Sports>
    </div>
  );
};

export default Home;
