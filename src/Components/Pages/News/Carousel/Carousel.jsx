
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Parallax } from "react-parallax";
import ReadMoreLink from "../../../../Shared/ReadMoreLink";
import { FaDownload } from "react-icons/fa";
import useNewsDownload from "../../../../hooks/useNewsDownload";
import './Carousel.css';

const Carousel = ({data}) => {




  
  const [handleNews , download , idx] = useNewsDownload();
  

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow : 4,
        
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 450,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ],
        swipeToSlide: true,
        afterChange: function(index) {
          console.log(
            `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
          );
        }
      };

    return (
        <>
        
          <div>
          
          <div className="container  mx-auto my-10  flex flex-col justify-center  w-[100%]  lg:px-10 ">
          <div className="heebo border-l-8 my-4  px-4  border-[#005689] mx-3 lg:mx-0">
                                                <h2 className="text-2xl lg:text-4xl font-bold py-4">News</h2>
                                        </div>
        
        
        <div className="slider-container bg-base-200 mx-3 lg:mx-0">
    <Slider {...settings}>
        {
                data?.map((news , index) => {
                    return (
                        <div className=" p-4  h-[282px] ">
                            <div className="h-[170px] w-full">
                                <img src={news?.urlToImage} alt=""className="h-full w-full object-cover" />
                            </div>
                            {/* content */}
                            <div className="mt-2 ">
                                
                                <h1 className="font-semibold  ">{news?.title.slice(0 , 50)}</h1>

                                
                                <div className="flex justify-between">
                                <ReadMoreLink></ReadMoreLink>
                                
                                </div>
                                
                            </div>
                        </div>
                    )
                })
        }
    </Slider>
  </div>
     
  </div>
            </div>  
          

            
            
        
        </>
    );
};

export default Carousel;