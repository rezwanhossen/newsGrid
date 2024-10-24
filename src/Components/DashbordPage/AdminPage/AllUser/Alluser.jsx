import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, Avatar } from '@mui/material';
import Swal from "sweetalert2";
import { useState } from "react";

const Alluser = () => {
 
  const asioxSecure = useAxiosSecure();
  const [rows, setRows] = useState([]);
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
    onSuccess: (data) => {
      setRows(data);
    },
  });

  const handelrol = (id) => {
    asioxSecure.patch(`/users/admin/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User is now admin",
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
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };


  // Columns definition for DataGrid
  const columns = [
    { field: 'id', headerName: 'No:', width: 90, sortable: false },
    { 
      field: 'avatar', 
      headerName: 'Avatar', 
      width: 100, 
      renderCell: (params) => (
        <Avatar alt={params.row.name} src={params.row.photoURL || '/static/images/avatar/1.jpg'} />
      )
    },
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    { field: 'email', headerName: 'Email', flex: 1, editable: true },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params) => (
        params.row.role === 'admin' ? (
          "Admin"
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handelrol(params.row._id)}
          >
            Make Admin
          </Button>
        )
      ),
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handelDelet(params.row)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const processedRows = users.map((user, index) => ({
    id: index + 1,
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.photoURL,
    role: user.role,
  }));

  if (isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <div className="flex justify-center mb-4">
        <h1 className="text-3xl font-bold m-4">All Users</h1>
      </div>
      <DataGrid
        rows={rows.length ? rows : processedRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{ Toolbar: GridToolbar }}
        sortingOrder={['asc', 'desc']}
        disableColumnSelector={false}
        disableDensitySelector={false}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            fontSize: '1rem',
          },
        }}
        getRowId={(row) => row._id}
      />
    </Box>
  );
};

export default Alluser;
