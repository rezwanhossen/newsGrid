/* eslint-disable react/prop-types */

import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const BookmarkCard = ({ bookmark }) => {
    const [myBookmarks, setMyBookmarks] = useState(null);
  const { image, title, _id } = bookmark;

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
            const remaining = myBookmarks.filter((myBookmark) =>
                 myBookmark._id !== _id);
            setMyBookmarks(remaining);
          });
        })
        };     
  return (
    <div>
      <div className="card glass">
        <figure>    
              <img
                src={image}
                className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
              />
        </figure>
        <div className="card-body">
          <h2 className="text-xl font-semibold">{title}</h2>
          
          <div className="card-actions justify-between mt-4">
            <button
              onClick={() => handleDelete(bookmark._id)}
              className="btn bg-transparent text-3xl text-red-700"
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
