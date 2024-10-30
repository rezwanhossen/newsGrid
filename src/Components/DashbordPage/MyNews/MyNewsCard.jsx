import React from "react";
import ReadMoreLink from "../../../Shared/ReadMoreLink";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import "sweetalert2/src/sweetalert2.scss";

const MyNewsCard = ({ news, refetch }) => {
  const axiosPublic = useAxiosPublic();

  const handleDeleteNews = () => {
    axiosPublic
      .delete(`/myNews/${news?._id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your news has been deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div className=" bg-white transition-all duration-500 transform hover:scale-105 overflow-hidden shadow-md shadow-gray-700 relative">
        <div className="relative">
          <div className="w-full h-[166px]">
            <img
              src={news?.urlToImage}
              alt=""
              className="h-full  object-cover w-full "
            />
          </div>

          <div className=" p-5   heebo ">
            <h3 className="text-[15px] font-medium">
              {news?.title.slice(0, 45)}...
            </h3>
            <div className="flex justify-between">
              <ReadMoreLink news={news}></ReadMoreLink>

              <div className="flex gap-4 items-center">
                <RiDeleteBin5Fill
                  onClick={handleDeleteNews}
                  className="text-2xl text-red-600 hover:cursor-pointer"
                />
                {/* <FaEdit className="text-2xl text-[#005689] hover:cursor-pointer"></FaEdit> */}
              </div>
            </div>
          </div>

          {/*  */}
          <div className="heebo bg-[#005689] rounded-lg absolute top-3 right-3 px-3 text-white">
            <h2 className="font-semibold">{news?.status || "pending"}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNewsCard;
