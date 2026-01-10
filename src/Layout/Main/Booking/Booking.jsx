import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MainContext from "../../../Context/MainContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Components/Loader";
import { toast } from "react-toastify";
import { HeadProvider, Title } from "react-head";
import {
  MdOutlineShoppingCartCheckout,
  MdOutlinePayment,
  MdLocalShipping,
} from "react-icons/md";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const AxiosPublic = useAxiosPublic();
  const { user, theme } = useContext(MainContext);

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
    return (
      <div className="h-screen flex items-center justify-center">
        <Typography color="error" variant="h5">
          Product not found
        </Typography>
      </div>
    );

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
      orderTo: product.productOwner,
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

    if (product.paymentOption !== "Cash on Delivery") {
      navigate("/payment", { state: { booking: bookingData } });
      return;
    }

    try {
      await AxiosPublic.post("/orders", bookingData);
      toast.success("Order placed successfully");
      navigate("/dashboard/my-orders");
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  // Custom Input Styling for Dark Mode
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: theme === "dark" ? "white" : "inherit",
      "& fieldset": { borderColor: theme === "dark" ? "#334155" : "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#0ea5e9" },
    },
    "& .MuiInputLabel-root": {
      color: theme === "dark" ? "#94a3b8" : "#64748b",
    },
    mb: 2,
  };

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>Checkout || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-4xl mx-auto px-5">
        <div
          className={`sm:p-8 p-4 md:p-12 rounded-3xl border transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/50"
              : "bg-white border-gray-100 shadow-xl shadow-gray-200"
          }`}
          data-aos="zoom-in"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-sky-500/10 rounded-2xl text-sky-500 md:text-3xl sm:text-2xl text-xl">
              <MdOutlineShoppingCartCheckout />
            </div>
            <div>
              <h1 className="sm:text-2xl text-xl md:text-3xl font-black uppercase">
                Finalize Your Order
              </h1>
              <p
                className={`text-sm font-bold opacity-60 ${
                  theme === "dark" ? "text-slate-400" : "text-gray-500"
                }`}
              >
                Please review and provide your shipping details
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Read Only Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 sm:p-6 p-4 rounded-2xl border-2 border-dashed border-sky-500/20 bg-sky-500/5">
              <TextField
                label="Product Title"
                value={product.title}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={inputStyle}
              />
              <TextField
                label="Price (Per Unit)"
                value={`$${product.price}`}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={inputStyle}
              />
              <TextField
                label="Buyer Account"
                value={user?.email}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={inputStyle}
              />
              <TextField
                label="Total Calculation"
                value={totalPrice ? `$${totalPrice}` : "$0.00"}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{
                  ...inputStyle,
                  "& .MuiOutlinedInput-root": {
                    ...inputStyle["& .MuiOutlinedInput-root"],
                    backgroundColor: "rgba(14, 165, 233, 0.1)",
                  },
                  "& .MuiInputBase-input": {
                    fontWeight: "black",
                    color: "#0ea5e9",
                  },
                }}
              />
            </div>

            <Typography
              variant="h6"
              className="mb-4! flex items-center gap-2 font-black uppercase tracking-wider text-sm! opacity-70"
            >
              <MdLocalShipping /> Shipping Information
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="First Name"
                name="firstName"
                required
                fullWidth
                sx={inputStyle}
              />
              <TextField
                label="Last Name"
                name="lastName"
                required
                fullWidth
                sx={inputStyle}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Order Quantity"
                name="quantity"
                type="number"
                required
                onChange={(e) => setQuantity(Number(e.target.value))}
                helperText={`MOQ: ${product.moq} | Available: ${product.quantity}`}
                fullWidth
                sx={inputStyle}
              />
              <TextField
                label="Contact Number"
                name="contact"
                required
                fullWidth
                sx={inputStyle}
              />
            </div>

            <TextField
              label="Delivery Address"
              name="address"
              required
              multiline
              rows={3}
              fullWidth
              sx={inputStyle}
              placeholder="House #, Road #, City, Country"
            />

            <TextField
              label="Special Notes for Manager"
              name="notes"
              multiline
              rows={2}
              fullWidth
              sx={inputStyle}
              placeholder="Any specific instructions for your order..."
            />

            <div className="mt-10">
              <button
                type="submit"
                className="w-full sm:py-5 py-3 bg-sky-500 hover:bg-sky-600 text-white font-black sm:text-xl text-base rounded-2xl shadow-xl shadow-sky-500/30 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-tighter"
              >
                {product.paymentOption === "PayFirst" ? (
                  <>
                    Proceed to Payment <MdOutlinePayment />
                  </>
                ) : (
                  <>
                    Confirm & Place Order <MdLocalShipping />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs font-bold uppercase tracking-widest opacity-50">
                Payment Method:{" "}
                <span className="text-sky-500">{product.paymentOption}</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;
