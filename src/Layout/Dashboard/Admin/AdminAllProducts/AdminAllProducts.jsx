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

const AdminAllProducts = () => {
  const { user } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["adminProducts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/products?owner=${user.email}`);
      return res.data;
    },
  });

  return (
    <Box sx={{ p: 3 }}>
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
                    <Switch checked={product.showOnHome} disabled />
                  </TableCell>

                  <TableCell>
                    <Button size="small" variant="outlined">
                      Update
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      sx={{ ml: 1 }}
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
    </Box>
  );
};

export default AdminAllProducts;
