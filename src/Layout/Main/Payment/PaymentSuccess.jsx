import { useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useRef } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import MainContext from "../../../Context/MainContext";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(MainContext);

  const hasSaved = useRef(false);

  const booking = location.state?.booking;
  const transactionId = location.state?.transactionId;

  useEffect(() => {
    if (hasSaved.current) return;
    hasSaved.current = true;

    if (!booking || !transactionId || !user?.email) {
      toast.error("Invalid payment data");
      return;
    }

    const savePaymentAndOrder = async () => {
      try {
        // 1 Save payment (Finance critical)
        await axiosPublic.post("/payments", {
          productId: booking.productId,
          orderId: booking._id || null,
          amount: booking.totalPrice,
          transactionId,
          buyerEmail: user.email,
          paymentMethod: "Stripe",
        });

        // 2️ Create order
        await axiosPublic.post("/orders", {
          productId: booking.productId,
          productTitle: booking.productTitle,
          orderQuantity: booking.orderQuantity,
          totalPrice: booking.totalPrice,
          buyerEmail: user.email,
          firstName: booking.firstName,
          lastName: booking.lastName,
          phone: booking.phone,
          address: booking.address,
          notes: booking.notes,
          paymentOption: "Online",
          transactionId,
        });

        toast.success("Order placed successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to finalize order");
      }
    };

    savePaymentAndOrder();
  }, [booking, transactionId, user]);

  return (
    <Box display="flex" justifyContent="center" mt={10} px={2}>
      <Paper
        elevation={3}
        sx={{ p: 5, maxWidth: 500, width: "100%", textAlign: "center" }}
      >
        <Typography variant="h4" color="success.main" fontWeight="bold">
          Payment Successful 🎉
        </Typography>

        <Typography mt={2}>
          Your payment has been completed and your order is confirmed.
        </Typography>

        <Typography mt={1}>
          Transaction ID:
          <strong> {transactionId}</strong>
        </Typography>

        <Box mt={4} display="flex" gap={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/my-orders")}
          >
            My Orders
          </Button>

          <Button variant="outlined" onClick={() => navigate("/products")}>
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaymentSuccess;
