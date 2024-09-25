


import TwoColumnLayout from "./TwoColumnLayout/TwoColumnLayout";
import { Parallax } from "react-parallax";
import ThreeColumnLayout from "./ThreeColumnLayout/ThreeColumnLayout";
import Carousel from "./Carousel/Carousel";
import { useEffect, useState } from "react";











const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [country , setCountry] = useState('us')
    const [category , setCategory] = useState('sports');


    const getNews = () => {
        fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=4eb7896db1c540fb9de9160b3d0dcf0f`)
        .then(res => res.json())
        .then(data => {
            console.log(data?.articles)
            setNewsData(data?.articles)
        })
    }
    useEffect(() => {
            getNews()
    } , [])
    
    if(!newsData){
        return <div className="h-screen">Loading ....</div>
    }

    


    

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
                {/* two column layout  */}
                 <TwoColumnLayout data={newsData?.slice(0 , 2)}></TwoColumnLayout>
                <ThreeColumnLayout data={newsData?.slice(2 , 14)}></ThreeColumnLayout> 
            </div>
             <Carousel data ={newsData?.slice(14 , 20)}></Carousel>

             
             
             {/* Pagination বাটন */}
            {/* <div> */}
                {/* <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="btn"
                >
                    Previous Page
                </button>

                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={news.length < itemsPerPage}
                    className="btn"
                >
                    Next Page
                </button> */}
            {/* </div> */}



        </div>

        

    );
};

export default News;