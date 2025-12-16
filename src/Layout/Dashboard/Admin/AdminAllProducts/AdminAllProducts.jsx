import { useContext } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Switch,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Loader from "../../../../Components/Loader";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { HeadProvider, Title } from "react-head";

const AdminAllProducts = () => {
  const { user } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["adminProducts", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/admin/products?owner=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  // update to show homepage
  const handleToggleHome = async (id, currentValue) => {
    await AxiosPublic.patch(`/products/show-home/${id}`, {
      showOnHome: !currentValue,
    });

    toast.success("Updated Home Visibility");
    queryClient.invalidateQueries(["adminProducts", user?.email]);
  };

  // delete product
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AxiosPublic.delete(`/products/${id}`);
        toast.success("Product deleted");
        queryClient.invalidateQueries(["adminProducts", user?.email]);
      }
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <HeadProvider>
        <Title>Manage Products || NextRun Tracker</Title>
      </HeadProvider>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        All Products (Admin)
      </Typography>

      {isLoading ? (
        <Loader></Loader>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Show on Home</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img src={product.images?.[0]} alt="product" width="50" />
                  </TableCell>

                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.productOwner}</TableCell>

                  <TableCell>
                    <Switch
                      checked={product.showOnHome}
                      onChange={() =>
                        handleToggleHome(product._id, product.showOnHome)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      type="button"
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        navigate(`/dashboard/update-products/${product._id}`)
                      }
                    >
                      Update
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      sx={{ ml: 1 }}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default AdminAllProducts;
