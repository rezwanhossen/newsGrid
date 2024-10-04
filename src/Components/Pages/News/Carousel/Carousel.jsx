
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Parallax } from "react-parallax";
import ReadMoreLink from "../../../../Shared/ReadMoreLink";
import { FaDownload } from "react-icons/fa";
import useNewsDownload from "../../../../hooks/useNewsDownload";
import { useState } from "react";

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
        
            
            <Parallax bgImage={"https://static.vecteezy.com/system/resources/previews/033/212/422/non_2x/modern-television-studio-for-world-breaking-news-with-equipment-for-leading-reporters-and-announcers-free-photo.jpg"} strength={500} className="h-[400px] lg:h-[600px] flex flex-col justify-center">
      <div className="h-full  w-[100%]  px-10 mb-10">
        
        
            <div className="slider-container">
        <Slider {...settings}>
            {
                    data?.map((news , index) => {
                        return (
                            <div className=" p-4 bg-black h-[282px]">
                                <div className="h-[170px] w-full">
                                    <img src={news?.urlToImage} alt=""className="h-full w-full object-cover" />
                                </div>
                                {/* content */}
                                <div className="mt-2 text-white">
                                    
                                    <h1 className="font-semibold  ">{news?.title.slice(0 , 50)}</h1>

                                    
                                    <div className="flex justify-between">
                                    <ReadMoreLink></ReadMoreLink>
                                    <div  onClick={() => handleNews(news , index)}>
                                      <FaDownload className="text-xl hover:cursor-pointer"></FaDownload>
                                    </div>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    })
            }
        </Slider>
      </div>
         
      </div>
    </Parallax>

            
            
        
        </>
    );
};

export default Carousel;