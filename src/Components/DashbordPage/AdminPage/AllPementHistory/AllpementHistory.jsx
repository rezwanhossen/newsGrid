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

  // Fetch payments data using react-query
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payment");
      return data;
    },
  });

  const [searchText, setSearchText] = useState("");

  // Define columns for the table using useMemo
  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "index",
        cell: (info) => info.row.index + 1, 
      },
      {
        header: "Name",
        accessorKey: "name", 
      },
      {
        header: "Email",
        accessorKey: "email", 
      },
      {
        header: "Price",
        accessorKey: "price", 
      },
      {
        header: "Transaction Id",
        accessorKey: "transactionId", 
      },
      {
        header: "Date",
        accessorKey: "date", 
      },
    ],
    []
  );

  // Filter payments based on search input
  const filteredPayments = useMemo(() => {
    return payments.filter(
      (payment) =>
        payment.name?.toLowerCase().includes(searchText.toLowerCase()) || 
        payment.email?.toLowerCase().includes(searchText.toLowerCase()) 
    );
  }, [payments, searchText]);

  // Set up the table with pagination and row models
  const table = useReactTable({
    data: filteredPayments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Loading state
  if (isLoading) {
    return <div className="flex justify-center text-4xl">Loading...</div>;
  }

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex justify-center mb-4">
        <h1 className="text-3xl font-bold">All Payments</h1>
        
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Payments Table */}
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <span>
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AllPaymentHistory;
