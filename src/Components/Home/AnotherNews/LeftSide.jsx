import { IoMdTime } from "react-icons/io";
import ReadMoreLink from "../../../Shared/ReadMoreLink";

const LeftSide = ({ newsData }) => {
  console.log(newsData);
  return (
    <>
      <div>
        {newsData?.slice(29, 33).map((news) => {
          return (
            <div className="py-4  border-t border-b border-dashed border-gray-500 mx-4 lg:mx-0">
              {/* left side nav */}
              <div className="flex flex-col-reverse lg:flex-row  heebo">
                <p className="font-semibold w-full lg:w-[17%]  flex  gap-4">
                  <IoMdTime className="text-lg"/>{news?.publishedAt.slice(0 , 10)}
                </p>
                <div className="w-full lg:w-[51%] lg:px-3">
                  <p className="text-[#005689] mb-2">
                    Author : {news?.author?.slice(0, 20)}...
                  </p>

                  <h2 className=" font-bold">
                    {news?.title.slice(0, 50)}...
                  </h2>
                  

                  
                  <p className="text-justify my-1 heebo text-[15px]">{news?.description?.slice(0, 100)}...</p>

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
