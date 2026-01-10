import { useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useRef } from "react";
import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import MainContext from "../../../Context/MainContext";
import { HeadProvider, Title } from "react-head";
import {
  MdCheckCircle,
  MdReceipt,
  MdShoppingBag,
  MdArrowForward,
} from "react-icons/md";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user, theme } = useContext(MainContext);

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
        // 1 Save payment
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
          orderTo: booking.orderTo,
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
  }, [booking, transactionId, user, axiosPublic]);

  return (
    <section
      className={`min-h-[90vh] flex items-center justify-center py-20 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>Payment Successful || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-2xl w-full sm:px-5 p-4" data-aos="zoom-in">
        <div
          className={`relative overflow-hidden p-4 sm:p-8 md:p-12 rounded-3xl border text-center transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          {/* Top Decorative Circle */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse"></div>
              <MdCheckCircle className="lg:text-8xl md:text-7xl text-6xl text-emerald-500 relative z-10" />
            </div>
          </div>

          <h1 className="sm:text-3xl text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">
            Payment <span className="text-emerald-500">Confirmed!</span>
          </h1>

          <p
            className={`text-lg mb-8 max-w-md mx-auto leading-relaxed ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Your transaction was processed successfully. We've sent a
            confirmation details to your registered email.
          </p>

          {/* Transaction Card */}
          <div
            className={`mb-10 sm:p-6 p-3 rounded-2xl border-2 border-dashed text-left ${
              theme === "dark"
                ? "bg-slate-950/50 border-slate-800"
                : "bg-emerald-50/50 border-emerald-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-4 text-emerald-500 font-black text-xs uppercase tracking-widest">
              <MdReceipt className="text-xl" /> Transaction Summary
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap truncate justify-between text-sm">
                <span className="opacity-60 uppercase font-bold">
                  Transaction ID:
                </span>
                <span className="font-mono font-bold text-sky-500">
                  {transactionId}
                </span>
              </div>
              <div className="flex flex-wrap truncate justify-between text-sm">
                <span className="opacity-60 uppercase font-bold">Product:</span>
                <span className="font-bold">{booking?.productTitle}</span>
              </div>
              <Divider
                className={theme === "dark" ? "bg-slate-800" : "bg-emerald-100"}
              />
              <div className="flex justify-between items-center">
                <span className="opacity-60 uppercase font-black">
                  Total Paid:
                </span>
                <span className="sm:text-2xl text-lg font-black text-emerald-500">
                  ${booking?.totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard/my-orders")}
              className="flex-1 py-4 px-6 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-2xl shadow-lg shadow-sky-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase text-sm tracking-wider"
            >
              <MdShoppingBag className="text-xl" /> View My Orders
            </button>

            <button
              onClick={() => navigate("/products")}
              className={`flex-1 py-4 px-6 font-black rounded-2xl border transition-all active:scale-95 flex items-center justify-center gap-2 uppercase text-sm tracking-wider ${
                theme === "dark"
                  ? "border-slate-700 hover:bg-slate-800 text-white"
                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
              }`}
            >
              Continue Shopping <MdArrowForward className="text-xl" />
            </button>
          </div>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[4px] opacity-30">
            NextRun Secure Verification Complete
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
