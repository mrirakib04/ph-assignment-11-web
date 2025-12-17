import { useLocation, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Box, Typography, Button, Divider, Paper } from "@mui/material";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import MainContext from "../../../Context/MainContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useContext(MainContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe not ready");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create PaymentIntent
      const res = await axiosPublic.post("/create-payment-intent", {
        amount: booking.totalPrice,
        productId: booking.productId,
      });

      const clientSecret = res.data.clientSecret;

      // 2️⃣ Confirm Card Payment
      const card = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Customer",
            email: user?.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful");

        navigate("/payment-success", {
          state: {
            booking,
            transactionId: result.paymentIntent.id,
          },
        });
      }
    } catch (err) {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Payment Details
      </Typography>

      <Typography>
        Product: <strong>{booking.productTitle}</strong>
      </Typography>

      <Typography>Quantity: {booking.orderQuantity}</Typography>

      <Typography mb={2}>
        Total Amount: <strong>${booking.totalPrice}</strong>
      </Typography>

      <Divider sx={{ my: 2 }} />

      <form onSubmit={handleSubmit}>
        <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 1, mb: 2 }}>
          <CardElement />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </Paper>
  );
};

const CheckoutPayment = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <Typography color="error" align="center" mt={10}>
        Invalid payment request
      </Typography>
    );
  }

  return (
    <Box className="flex justify-center py-10 px-4">
      <Box maxWidth={500} width="100%">
        <Elements stripe={stripePromise}>
          <PaymentForm booking={booking} />
        </Elements>
      </Box>
    </Box>
  );
};

export default CheckoutPayment;
