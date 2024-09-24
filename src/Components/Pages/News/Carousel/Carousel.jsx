
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({data}) => {

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        swipeToSlide: true,
        afterChange: function(index) {
          console.log(
            `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
          );
        }
      };

    return (
        <>
        
            <div className="bg-cyan-900 text-white flex flex-col justify-center h-[450px] w-[100%]  px-10 mb-10">

                <div className="mb-6">
                    <h1 className="text-2xl font-sans text-white border-t-4 border-red-50 py-4 border-b-4 text-center">More News</h1>
                </div>
            <div className="slider-container">
        <Slider {...settings}>
            {
                    data?.map((news , index) => {
                        return (
                            <div className="px-2">
                                <div className="h-[170px] w-full">
                                    <img src={news?.image} alt=""className="h-full w-full object-cover" />
                                </div>
                                {/* content */}
                                <div className="mt-2">
                                    
                                    <h1 className="font-semibold font-sans hover:text-red-300">{news?.title.slice(0 , 70)}</h1>
                                </div>
                            </div>
                        )
                    })
            }
        </Slider>
      </div>
            </div>
        
        </>
    );
};

export default Carousel;