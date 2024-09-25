import FeaturedSection from "./FeaturedSection/FeaturedSection";
import Banner from "./Banner/Banner/Banner";
import Sponsors from "./Sponsors/Sponsors";
import Sports from "./Sports/Sports";
import Bookmark from "../Bookmark/Bookmark";
const Home = () => {
  return (
    <div>
      <Bookmark/>
      <Banner />
      <FeaturedSection></FeaturedSection>
      <Sponsors></Sponsors>
      <Sports></Sports>
    </div>
  );
};

export default Home;
