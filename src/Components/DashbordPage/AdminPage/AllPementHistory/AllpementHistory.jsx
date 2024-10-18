import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const AllpementHistory = () => {
  const asioxSecure = useAxiosSecure();
  const {
    data: payment = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const { data } = await asioxSecure.get("/payment");
      return data;
    },
  });

  if (isLoading)
    return (
      <p className="flex justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </p>
    );

  return (
    <div className=" w-[90%] mx-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">All payments</h1>
        <h1 className="text-3xl font-bold">
          Totla payments <sup>{payment.length}</sup>
        </h1>
      </div>
      <div className=" my-5">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Price</th>
                <th>TransactionId</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payment.map((pay, inx) => (
                <tr key={pay._id}>
                  <th>{inx + 1}</th>
                  <td>{pay.name} </td>
                  <td>{pay.email}</td>
                  <td>{pay?.price}</td>
                  <td>{pay?.transactionId}</td>
                  <td>{pay?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllpementHistory;
