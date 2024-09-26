import { useEffect, useState } from "react";


const useNews = () => {
    const [newsData, setNewsData] = useState([]);
    const getNews = () => {
        fetch(` https://newsapi.org/v2/everything?q=bitcoin&apiKey=4eb7896db1c540fb9de9160b3d0dcf0f`)
        .then(res => res.json())
        .then(data => {
            const validData = data.articles?.filter(article => article.title && article.urlToImage);
            
            setNewsData(validData)
        })
    }
    useEffect(() => {
            getNews()
    } , [])
    return [newsData];
};

export default useNews;