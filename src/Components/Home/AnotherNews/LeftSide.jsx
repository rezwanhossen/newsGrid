import useNews from "../../../hooks/useNews";
import ReadMoreLink from "../../../Shared/ReadMoreLink";


const LeftSide = () => {
    const [newsData] = useNews();
    return (
        <>
            <div>
                    {
                        newsData?.slice(29 , 56).map(news => {
                            return (
                                <div className="py-4  border-t border-b border-dashed border-gray-500">
                                <div className="flex  font-sans">
                                    <p className="font-semibold w-[15%]">{news?.publishedAt}</p>
                                    <div className="w-[54%] px-3">
                                        <p className="text-red-500 mb-2">Author : {news?.author?.slice(0 , 20)}...</p>
                                        <h2 className="text-xl font-bold">{news?.title.slice(0 , 70)}...</h2>
                                        <p className="mt-2">{news?.description.slice(0 , 120)}...</p>
                                        <div className="mt-2">
                                        <ReadMoreLink  news={news}></ReadMoreLink>
                                        </div>
                                    </div>
                                    <div className="w-[30%] flex  items-center">
                                        <img src={news?.urlToImage} alt=""className="w-full h-[150px]" />
                                    </div>
                
                                </div>
                        </div>
                            )
                        })
                    }


            </div>
        
        </>
    );
};

export default LeftSide;