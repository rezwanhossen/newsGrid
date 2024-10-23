import { Link } from "react-router-dom";
import ReadMoreLink from "../../../../Shared/ReadMoreLink";


const ThreeColumnLayout = ({data}) => {
    return (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-6 border-b border-current mb-10 pb-6">
  {data?.map((news, index) => {
    return (
      <div
        className={`flex flex-row items-center gap-3 mx-4 lg:mx-0`}
      >
        <div className="w-[150px] lg:w-[80px] h-[70px] lg:h-[80px]">
          <img
            src={news?.urlToImage}
            alt=""
            className="w-[150px] lg:w-[80px] h-[70px]  lg:h-[80px] object-cover"
          />
        </div>
        {/* content */}
        <div className="lg:w-[330px] heebo">
          
          <h3 className="text-blue-600 font-semibold">{news?.category}</h3>
          <h1 className="font-bold hidden lg:block hover:text-zinc-500">
            {news?.title.slice(0, 70)}...
          </h1>
          <h1 className="font-bold block  lg:hidden hover:text-zinc-500">
            {news?.title.slice(0, 40)}...
          </h1>
        <ReadMoreLink news={news}></ReadMoreLink>
        </div>
      </div>
    );
  })}
</div>


        </>
    );
};

export default ThreeColumnLayout;