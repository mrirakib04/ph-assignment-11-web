import { useContext } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const ManagerAddProduct = () => {
  const { user } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();

  const { data: userData } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    retry: 3,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;

    const product = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      moq: Number(form.moq.value),
      images: form.images.value.split(",").map((img) => img.trim()),
      demoVideo: form.demoVideo.value,
      paymentOption: form.paymentOption.value,
      showOnHome: form.showOnHome.value === "true",
      productOwner:
        (userData?.role === "Admin" && user?.email) ||
        (userData?.role === "Manager" && userData?.managerFor),
    };

    try {
      const res = await AxiosPublic.post("/products", product);

      if (res.data.insertedId) {
        toast.success("Product added successfully");
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to add product");
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Add New Product
        </Typography>

        <Box component="form" onSubmit={handleAddProduct}>
          {/* Product Owner */}
          <TextField
            fullWidth
            label="Product Owner (Email)"
            value={
              (userData?.role === "Admin" && user?.email) ||
              (userData?.role === "Manager" && userData?.managerFor) ||
              ""
            }
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          {/* Title */}
          <TextField
            fullWidth
            label="Product Title"
            name="title"
            margin="normal"
            required
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Product Description"
            name="description"
            margin="normal"
            multiline
            rows={4}
            required
          />

          {/* Category */}
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            margin="normal"
            defaultValue="Accessories"
            required
          >
            <MenuItem value="Shirt">Shirt</MenuItem>
            <MenuItem value="Pant">Pant</MenuItem>
            <MenuItem value="Jacket">Jacket</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
          </TextField>

          {/* Price */}
          <TextField
            fullWidth
            type="number"
            label="Price"
            name="price"
            margin="normal"
            required
          />

          {/* Quantity */}
          <TextField
            fullWidth
            type="number"
            label="Available Quantity"
            name="quantity"
            margin="normal"
            required
          />

          {/* MOQ */}
          <TextField
            fullWidth
            type="number"
            label="Minimum Order Quantity (MOQ)"
            name="moq"
            margin="normal"
            required
          />

          {/* Images */}
          <TextField
            fullWidth
            label="Images URL (comma separated ',')"
            name="images"
            margin="normal"
            required
          />

          {/* Demo Video */}
          <TextField
            fullWidth
            label="Demo Video Link (optional)"
            name="demoVideo"
            margin="normal"
          />

          {/* Payment Option */}
          <TextField
            fullWidth
            select
            label="Payment Option"
            name="paymentOption"
            margin="normal"
            defaultValue="PayFirst"
            required
          >
            <MenuItem value="CashOnDelivery">Cash on Delivery</MenuItem>
            <MenuItem value="PayFirst">Pay First</MenuItem>
          </TextField>

          {/* Show on Home */}
          <TextField
            fullWidth
            select
            label="Show on Home Page"
            name="showOnHome"
            margin="normal"
            defaultValue="false"
          >
            <MenuItem value="false">No</MenuItem>
            <MenuItem value="true">Yes</MenuItem>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.2, fontWeight: "bold" }}
          >
            Add Product
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ManagerAddProduct;
