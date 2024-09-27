import CardLayout from "../CardLayout/CardLayout";
import Slider from "../Slider/Slider";




const Banner = () => {
    return (
        <>
                <div className="flex gap-4 flex-col lg:flex-row">
                        {/* carousel */}
                        <div className="w-full lg:w-[55%]">
                                <Slider></Slider>
                        </div>
                        {/* grid layout */}
                        <div className="w-full lg:w-[45%]">
                                <CardLayout></CardLayout>
                        </div>
                </div>
        </>
    );
};

export default Banner;

