import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useNews from "../../../../hooks/useNews";
import { Link } from "react-router-dom";

const Slider = () => {
  
  const [newsData] = useNews();
  console.log(newsData);      
  return (
    <div className="rounded-lg">
    <div>
      <Carousel className="rounded-lg"
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        stopOnHover={false}
        showStatus={false}
        showArrows={true}
      >

        
          
        {
          newsData && newsData?.slice(0 , 4).map((news , idx) => {
              
            return (
            
        <div className="relative h-[350px] md:h-[489px] rounded-lg"key={idx}>
        <img
          src={news?.urlToImage}
          className="h-full object-cover rounded-lg"
          alt="Bangladesh vs India"
        />
        {/* Content */}
        <div className="absolute bg-black opacity-75 px-4 pt-5 w-full rounded-lg bottom-0 pb-10">
          <div className="text-white">
            <h1 className="text-xl font-semibold">{news?.title.slice(0 , 100)}...</h1>
            
            <p className="text-lg">{news?.publishedAt}</p>
            <Link to={news?.url} target='_blank' className="text-red-400 hover:underline  mt-3 font-semibold font-sans">Read More...</Link>
          </div>
        </div>
      </div>
            )
              
          })
        }
        
        

      </Carousel>
    </div>
    </div>
  );
};

export default Slider;
