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
import { MdLock, MdCreditCard, MdOutlineSecurity } from "react-icons/md";
import { HeadProvider, Title } from "react-head";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user, theme } = useContext(MainContext);

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

  // Stripe Element Styling based on Theme
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: theme === "dark" ? "#fff" : "#1e293b",
        "::placeholder": {
          color: theme === "dark" ? "#94a3b8" : "#64748b",
        },
      },
      invalid: {
        color: "#ef4444",
      },
    },
  };

  return (
    <div
      className={`p-3 sm:p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 shadow-2xl"
          : "bg-white border-gray-100 shadow-xl"
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-sky-500/10 rounded-xl text-sky-500 text-2xl">
          <MdCreditCard />
        </div>
        <h2 className="sm:text-xl text-lg sm:font-black font-bold uppercase tracking-tight">
          Payment Details
        </h2>
      </div>

      <div
        className={`mb-6 sm:p-5 p-4 rounded-2xl border border-dashed ${
          theme === "dark"
            ? "bg-slate-950/50 border-slate-800"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <div className="flex justify-between mb-2">
          <span className="opacity-60 text-sm font-bold uppercase">
            Product:
          </span>
          <span className="font-bold text-sky-500 text-sm text-right">
            {booking.productTitle}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="opacity-60 text-sm font-bold uppercase">
            Quantity:
          </span>
          <span className="font-bold text-sm">
            {booking.orderQuantity} Units
          </span>
        </div>
        <Divider
          className={`my-3 ${
            theme === "dark" ? "bg-slate-800" : "bg-gray-200"
          }`}
        />
        <div className="flex justify-between items-center">
          <span className="opacity-60 text-sm font-bold uppercase">
            Total Amount:
          </span>
          <span className="md:text-2xl sm:text-xl text-lg font-black text-sky-500">
            ${booking.totalPrice}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest opacity-50 mb-2 ml-1">
            Card Information
          </label>
          <div
            className={`p-4 rounded-xl border transition-all ${
              theme === "dark"
                ? "bg-slate-950 border-slate-800 focus-within:border-sky-500"
                : "bg-white border-gray-200 focus-within:border-sky-500"
            }`}
          >
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-tighter opacity-50 px-1">
          <MdOutlineSecurity className="text-lg text-emerald-500" />
          Secure 256-bit encrypted payment via Stripe
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-tighter ${
            loading || !stripe
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/20"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">Processing...</span>
          ) : (
            <>
              Pay Now <MdLock />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const CheckoutPayment = () => {
  const location = useLocation();
  const { theme } = useContext(MainContext);
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <Typography color="error" variant="h5" fontWeight="bold">
          Invalid Request
        </Typography>
        <Button variant="outlined" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <section
      className={`min-h-[80vh] py-20 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>Secure Payment || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-7xl mx-auto px-5 flex justify-center">
        <div className="w-full max-w-lg" data-aos="zoom-in">
          <div className="text-center mb-10">
            <h1 className="md:text-3xl text-2xl font-black uppercase tracking-tighter mb-2">
              Secure <span className="text-sky-500">Checkout</span>
            </h1>
            <div className="w-16 h-1 bg-sky-500 mx-auto rounded-full"></div>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentForm booking={booking} />
          </Elements>

          <p className="mt-8 text-center text-xs font-bold opacity-40 uppercase tracking-[3px]">
            Powered by NextRun Ecosystem
          </p>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPayment;
