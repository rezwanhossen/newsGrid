import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const Alluser = () => {
  const asioxSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await asioxSecure.get("/users");
      return data;
    },
  });
  const handelrol = (id) => {
    asioxSecure.patch(`/users/admin/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "is admin now",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handelDelet = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        asioxSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (isLoading)
    return <span className="loading loading-bars loading-lg"></span>;

  return (
    <div className=" w-[90%] mx-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">All Users</h1>
        <h1 className="text-3xl font-bold">
          Totla Users <sup>{users.length}</sup>
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, inx) => (
                <tr key={user._id}>
                  <th>{inx + 1}</th>
                  <td>{user.name} </td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        className="btn"
                        onClick={() => handelrol(user._id)}
                      >
                        <FaUser></FaUser>
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handelDelet(user)} className="btn">
                      <FaTrashAlt className=" text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alluser;
