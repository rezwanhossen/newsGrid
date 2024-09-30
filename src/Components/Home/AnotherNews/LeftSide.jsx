import ReadMoreLink from "../../../Shared/ReadMoreLink";

const LeftSide = ({ newsData }) => {
  console.log(newsData);
  return (
    <>
      <div>
        {newsData?.slice(29, 52).map((news) => {
          return (
            <div className="py-4  border-t border-b border-dashed border-gray-500 mx-4 lg:mx-0">
              {/* left side nav */}
              <div className="flex flex-col-reverse lg:flex-row  font-sans">
                <p className="font-semibold w-full lg:w-[15%]">
                  {news?.publishedAt}
                </p>
                <div className="w-full lg:w-[54%] lg:px-3">
                  <p className="text-red-500 mb-2">
                    Author : {news?.author?.slice(0, 20)}...
                  </p>

                  <h2 className="text-xl font-bold">
                    {news?.title.slice(0, 70)}...
                  </h2>
                  

                  <h2 className="text-xl font-semibold">
                    {news?.title.slice(0, 70)}...
                  </h2>
                  <p className="">{news?.description?.slice(0, 120)}...</p>

                  <div className="mt-2">
                    <ReadMoreLink news={news}></ReadMoreLink>
                  </div>
                </div>
                <div className="w-full lg:w-[30%] flex  items-center">
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
