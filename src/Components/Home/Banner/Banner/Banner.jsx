import CardLayout from "../CardLayout/CardLayout";
import Slider from "../Slider/Slider";




const Banner = ({newsData}) => {
    return (
        <>
                <div className="bg-base-200 pt-10">
                <div className="flex gap-4 container mx-auto flex-col lg:flex-row">
                        {/* carousel */}
                        <div className="w-full lg:w-[70%]">
                                <Slider newsData={newsData}></Slider>
                        </div>
                        {/* grid layout */}
                        <div className="w-full lg:w-[30%]">
                                <CardLayout newsData={newsData}></CardLayout>
                        </div>
                </div>
                </div>
        </>
    );
};

export default Banner;

