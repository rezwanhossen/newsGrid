import Card from "../../../../Shared/Card";
import CardLayout from "../CardLayout/CardLayout";
import Slider from "../Slider/Slider";




const Banner = ({newsData}) => {
    return (
        <>
                <div className="bg-base-200 py-10">
                <div className="flex gap-6 container mx-auto flex-col lg:flex-row">
                        {/* carousel */}
                        <div className="w-full lg:w-[70%]">
                                <Slider newsData={newsData}></Slider>

                                {/* 3 column card layout */}
                                <div className="mx-3 lg:mx-0">
                                        <div className="heebo border-l-8 mt-4 mb-6 px-4 border-[#005689]">
                                                <h2 className="text-3xl font-bold py-4">Latest News</h2>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                                                {
                                                        newsData?.slice(10 , 16).map(news => <Card news={news}></Card>)
                                                }
                                        </div>
                                </div>
                        </div>
                        {/* grid layout */}
                        <div className="w-full lg:w-[30%]">
                                <CardLayout newsData={newsData}></CardLayout>
                                <div className="w-full h-[370px] mt-4 hidden lg:block  lg:rounded-lg">
                                        <img src="https://i.pinimg.com/originals/16/b6/86/16b6865963fe775aa9811ed673cd2fb5.gif" alt="" className="rounded-lg w-full object-cover h-full"/>
                                </div>
                        </div>
                </div>
                </div>
        </>
    );
};

export default Banner;

