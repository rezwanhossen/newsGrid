import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TwoColumnLayout from "./TwoColumnLayout/TwoColumnLayout";
import { Parallax } from "react-parallax";
import ThreeColumnLayout from "./ThreeColumnLayout/ThreeColumnLayout";
import Carousel from "./Carousel/Carousel";




const News = () => {

    const {data : news = [] , isLoading} = useQuery({
        queryKey : ['news'],
        queryFn : async() => {
                const res = await axios.get('/newsData.json')
                return res.data;
            }
    })
    

    return (
        <div>
            {/* news banner */}
            {/* <SimpleParallax scale={1.7}> */}


            <Parallax bgImage={"https://static.vecteezy.com/system/resources/previews/033/212/422/non_2x/modern-television-studio-for-world-breaking-news-with-equipment-for-leading-reporters-and-announcers-free-photo.jpg"} strength={500}>
      <div style={{ height: 600 }}>
        

        <div className="h-[600px] bg-no-repeat bg-cover bg-center flex justify-center items-center text-white contentBanner">
                 <div className="h-full bg-black bg-opacity-70 w-full flex justify-center items-center ">
                 <h1 className="text-4xl font-bold font-mono text-white ">Home || All News</h1>
                 </div>
            </div>   
      </div>
    </Parallax>
                                 
                                
            


            {/* news */}
            <div className="max-w-7xl mx-auto mt-4">
                {/* two column layout */}
                <TwoColumnLayout data={news?.slice(0 , 2)}></TwoColumnLayout>
                <ThreeColumnLayout data={news?.slice(2 , 14)}></ThreeColumnLayout>
            </div>
            <Carousel data ={news}></Carousel>




        </div>
    );
};

export default News;