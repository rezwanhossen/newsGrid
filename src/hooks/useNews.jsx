import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${
//           import.meta.env.VITE_NAIMUL_API_KEY
//         }`

const useNews = () => {
  const { data: newsData = [], isLoading } = useQuery({
    queryKey: ["allnews"],
    queryFn: async () => {
      // const response = await axios.get("https://news-grid-server.vercel.app/allnews");
      // // console.log("response : ", response.data);
      // const news = response?.data?.articles.filter(
      //   (news) => news.title && news.urlToImage
      //);
      // return news;
      const { data } = await axios.get(
        "https://news-grid-server.vercel.app/allnews"
      );
      return data;
    },
  });
  console.log(newsData);

  return [newsData, isLoading];
};

export default useNews;
