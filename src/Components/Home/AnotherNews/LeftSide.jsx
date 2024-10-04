import ReadMoreLink from "../../../Shared/ReadMoreLink";

const LeftSide = ({ newsData }) => {
  console.log(newsData);
  return (
    <>
      <div>
        {newsData?.slice(29, 35).map((news) => {
          return (
            <div className="py-4  border-t border-b border-dashed border-gray-500 mx-4 lg:mx-0">
              {/* left side nav */}
              <div className="flex flex-col-reverse lg:flex-row  ">
                <p className="font-semibold w-full lg:w-[17%]">
                  {news?.publishedAt}
                </p>
                <div className="w-full lg:w-[51%] lg:px-3">
                  <p className="text-red-500 mb-2">
                    Author : {news?.author?.slice(0, 20)}...
                  </p>

                  <h2 className="text-lg font-bold">
                    {news?.title.slice(0, 50)}...
                  </h2>
                  

                  
                  <p className="text-justify my-1">{news?.description?.slice(0, 100)}...</p>

                  <div className="mt-2">
                    <ReadMoreLink news={news}></ReadMoreLink>
                  </div>
                </div>
                <div className="w-full lg:w-[32%] flex  items-center">
                  <img
                    src={news?.urlToImage}
                    alt=""
                    className="w-full lg:h-[150px]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LeftSide;
