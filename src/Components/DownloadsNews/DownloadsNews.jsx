import { useEffect, useState } from "react";
import useNewsDownload from "../../hooks/useNewsDownload";


const DownloadsNews = () => {
    
    const [ ,  , idx] = useNewsDownload()


    const [news , setNews] = useState([]);
    console.log(news);
    useEffect(() => {
        const savedNews = localStorage.getItem('newsDownload');
        if(savedNews){
            
                setNews(JSON.parse(savedNews));
                // setIsDownload(true);
        }
    } , [idx])
    return (
        <div className="py-32 container mx-auto">
                <h1 className="text-2xl font-boold">Downloads : {news?.length}</h1>

                <div className="grid grid-cols-4 gap-4">
                    {
                        news?.map(singleNews => {
                             return(
                                <div className="border h-[300px]">
                                        <h3 className="text-xl font-semibold">Author : {singleNews?.author}</h3>


                                </div>
                             )
                        })
                    }
                </div>

        </div>
    );
};

export default DownloadsNews;