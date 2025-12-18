import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MainContext from "../../../Context/MainContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Components/Loader";
import { toast } from "react-toastify";
import { HeadProvider, Title } from "react-head";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const AxiosPublic = useAxiosPublic();
  const { user } = useContext(MainContext);

  const [quantity, setQuantity] = useState(0);

  // Fetch product
  const { data: product, isLoading } = useQuery({
    queryKey: ["bookingProduct", id],
    enabled: !!id,
    retry: 1,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/general/product/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (!product?._id)
    return <Typography color="error">Product not found</Typography>;

  const totalPrice = quantity > 0 ? quantity * product.price : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const orderQuantity = Number(form.quantity.value);

    if (orderQuantity < product.moq) {
      return toast.error(`Minimum order quantity is ${product.moq}`);
    }

    if (orderQuantity > product.quantity) {
      return toast.error("Order quantity exceeds available stock");
    }

    const bookingData = {
      productId: product._id,
      productTitle: product.title,
      pricePerUnit: product.price,
      orderQuantity,
      totalPrice,
      paymentOption: product.paymentOption,
      buyerEmail: user.email,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contact: form.contact.value,
      address: form.address.value,
      notes: form.notes.value,
    };

    // Payment required → go to payment page
    if (product.paymentOption !== "Cash on Delivery") {
      navigate("/payment", {
        state: {
          booking: bookingData,
        },
      });
      return;
    }

    // COD → save booking directly
    try {
      await AxiosPublic.post("/orders", bookingData);
      toast.success("Order placed successfully");
      navigate("/dashboard/my-orders");
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  return (
    <Box className="px-5 py-10 flex justify-center">
      <HeadProvider>
        <Title>Booking || NextRun Tracker</Title>
      </HeadProvider>
      <Box className="max-w-3xl w-full bg-white p-6 rounded-lg shadow border">
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Booking / Order Form
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <TextField
            label="Email"
            value={user?.email}
            InputProps={{ readOnly: true }}
            fullWidth
          />

          <TextField
            label="Product"
            value={product.title}
            InputProps={{ readOnly: true }}
            fullWidth
          />

          <TextField
            label="Price (per unit)"
            value={`$${product.price}`}
            InputProps={{ readOnly: true }}
            fullWidth
          />

          <Divider />

          <TextField label="First Name" name="firstName" required fullWidth />

          <TextField label="Last Name" name="lastName" required fullWidth />

          <TextField
            label="Order Quantity"
            name="quantity"
            type="number"
            required
            inputProps={{
              min: product.moq,
              max: product.quantity,
            }}
            onChange={(e) => setQuantity(Number(e.target.value))}
            helperText={`Min: ${product.moq}, Max: ${product.quantity}`}
            fullWidth
          />

          <TextField
            label="Total Price"
            value={totalPrice ? `$${totalPrice}` : ""}
            InputProps={{ readOnly: true }}
            fullWidth
          />

          <TextField label="Contact Number" name="contact" required fullWidth />

          <TextField
            label="Delivery Address"
            name="address"
            required
            multiline
            rows={2}
            fullWidth
          />

          <TextField
            label="Additional Notes"
            name="notes"
            multiline
            rows={2}
            fullWidth
          />

          <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
            {product.paymentOption === "PayFirst"
              ? "Confirm & Continue"
              : "Place Order"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Booking;
