// AllPaymentHistory.js
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const AllPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();

  // Define the fetchPayments function inside the component
  const fetchPayments = async () => {
    const { data } = await axiosSecure.get("/payment");
    return data;
  };

  // Use react-query to fetch payments data
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });

  // ... rest of the component code (searching, filtering, pagination)
};

export default AllPaymentHistory;
