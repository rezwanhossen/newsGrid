import ReadMoreLink from "./ReadMoreLink";

const Card = ({ news }) => {
  console.log(news._id);
  return (
    <div className=" bg-white transition-all duration-500 transform hover:scale-105 overflow-hidden shadow-md shadow-gray-700">
      <div className="   relative ">
        <div className="w-full h-[166px]">
          <img
            src={
              news?.urlToImage ||
              news?.image ||
              news?.image_url ||
              news?.url_image
            }
            alt=""
            className="h-full  object-cover w-full "
          />
        </div>

        <div className=" p-5   heebo ">
          <h3 className="text-xl text-[#4A4A4A] font-medium">
            {news?.title.slice(0, 35)}...
          </h3>
          <ReadMoreLink news={news}></ReadMoreLink>
        </div>
        <div className=" flex justify-between">
          <h1>Link</h1>
          <h1>Comment</h1>
          <h1>shear</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
