import CardLayout from "../CardLayout/CardLayout";
import Slider from "../Slider/Slider";

const Banner = ({newsData}) => {
  return (
    <>
      <div className="flex gap-4 flex-col  lg:flex-row px-4 md:px-0 container mx-auto my-5 ">
        {/* carousel */}
        <div className="w-full lg:w-[55%]">
          <Slider newsData={newsData}></Slider>
        </div>
        {/* grid layout */}
        <div className="w-full lg:w-[45%]">
          <CardLayout newsData={newsData}></CardLayout>
        </div>
      </div>
    </>
  );
  
};

export default Banner;
