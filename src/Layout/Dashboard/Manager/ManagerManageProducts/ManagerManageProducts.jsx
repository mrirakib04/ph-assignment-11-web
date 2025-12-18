import { useContext, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Loader from "../../../../Components/Loader";
import Swal from "sweetalert2";

const ManagerManageProducts = () => {
  const { user } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // get manager info
  const { data: manager } = useQuery({
    queryKey: ["manager", user?.email],
    enabled: !!user?.email,
    retry: 3,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // get manager products
  const { data, isLoading } = useQuery({
    queryKey: ["managerProducts", manager?.managerFor, page, search],
    enabled: !!manager?.managerFor,
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/admin/products?owner=${manager.managerFor}&page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await AxiosPublic.delete(`/products/${id}`);
          toast.success("Product deleted successfully");
          queryClient.invalidateQueries(["managerProducts"]);
        } catch (err) {
          toast.error("Failed to delete product");
        }
      }
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Manage Products
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          label="Search by name or category"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{ mb: 3 }}
        />

        {/* Table */}
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Payment Mode</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        width={50}
                        height={50}
                        style={{ objectFit: "cover", borderRadius: 4 }}
                      />
                    </TableCell>

                    <TableCell>{product.title}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.paymentOption}</TableCell>

                    <TableCell align="center">
                      <Button
                        size="small"
                        onClick={() =>
                          navigate(`/dashboard/update-products/${product._id}`)
                        }
                      >
                        Update
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ManagerManageProducts;
