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
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(MainContext);

  // Load product
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    retry: 3,
    queryFn: async () => {
      const res = await axiosPublic.get(`/general/product/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Typography align="center">Loading...</Typography>;
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedProduct = {
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
      updatedAt: new Date(),
    };

    try {
      await axiosPublic.patch(`/update/product/${id}`, updatedProduct);
      toast.success("Product updated successfully");
      navigate("/dashboard/home");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Update Product
        </Typography>

        <Box component="form" onSubmit={handleUpdateProduct}>
          <TextField
            fullWidth
            label="Product Owner"
            value={product.productOwner}
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          <TextField
            fullWidth
            label="Product Title"
            name="title"
            defaultValue={product.title}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Product Description"
            name="description"
            defaultValue={product.description}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            defaultValue={product.category}
            margin="normal"
            required
          >
            <MenuItem value="Shirt">Shirt</MenuItem>
            <MenuItem value="Pant">Pant</MenuItem>
            <MenuItem value="Jacket">Jacket</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Price"
            name="price"
            defaultValue={product.price}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            type="number"
            label="Available Quantity"
            name="quantity"
            defaultValue={product.quantity}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            type="number"
            label="MOQ"
            name="moq"
            defaultValue={product.moq}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Images (comma separated)"
            name="images"
            defaultValue={product.images.join(", ")}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Demo Video"
            name="demoVideo"
            defaultValue={product.demoVideo || ""}
            margin="normal"
          />

          <TextField
            fullWidth
            select
            label="Payment Option"
            name="paymentOption"
            defaultValue={product.paymentOption}
            margin="normal"
            required
          >
            <MenuItem value="CashOnDelivery">Cash on Delivery</MenuItem>
            <MenuItem value="PayFirst">Pay First</MenuItem>
          </TextField>

          <TextField
            fullWidth
            select
            label="Show on Home"
            name="showOnHome"
            defaultValue={String(product.showOnHome)}
            margin="normal"
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
            Update Product
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateProduct;
