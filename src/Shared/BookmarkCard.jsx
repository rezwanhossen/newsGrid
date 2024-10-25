/* eslint-disable react/prop-types */

import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../Hook/useAuth/useAuth";
import { Link } from "react-router-dom";

const BookmarkCard = ({ bookmark }) => {
  const [myBookmarks, setMyBookmarks] = useState(null);
  const { image, title } = bookmark;
  const { loding } = useAuth();

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      loding(true);
      if (result.isConfirmed)
        fetch(`http://localhost:5000/bookmarks/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            setMyBookmarks(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Data has been deleted.",
                icon: "success",
              });
            }
            const remaining = myBookmarks.filter(
              (myBookmark) => myBookmark._id !== _id
            );
            setMyBookmarks(remaining);
          });
    });
  };
  return (
    <div>
      <div className="card glass">
        <img
          src={image}
          className="object-cover object-center h-[300px] w-full rounded-t-md dark:bg-gray-500"
        />

        <div className="card-body">
          <h2 className="text-xl font-semibold">{title}</h2>

          <div className="card-actions justify-between mt-4">
            <button
              onClick={() => handleDelete(bookmark._id)}
              className="btn bg-transparent text-3xl text-red-700"
            >
              <MdDeleteForever />
            </button>
            <Link className="text-orange-500 underline hover:text-orange-700 transition duration-300">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
