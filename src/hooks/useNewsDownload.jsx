
import { useEffect, useState } from "react";


const useNewsDownload = () => {
    
    const [download , setIsDownload] = useState(false);
    const [news , setNews] = useState('');
    console.log("paichi" , news);


    const [idx , setIdx] = useState(null);
    const handleNews = (news , index ) => {
        const data = JSON.parse(localStorage.getItem('newsDownload')) || [];

        data.push(news)
        localStorage.setItem('newsDownload' , JSON.stringify(data));
        setIsDownload(true);
        setIdx(index)

        

  }




    


    
    
            

        
    

    
    return [handleNews , download , idx]
};

export default useNewsDownload;