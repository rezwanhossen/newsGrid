import CardLayout from "../CardLayout/CardLayout";
import Slider from "../Slider/Slider";




const Banner = ({newsData}) => {
    return (
        <>
                <div className="flex gap-4 max-w-7xl mx-auto flex-col lg:flex-row">
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

