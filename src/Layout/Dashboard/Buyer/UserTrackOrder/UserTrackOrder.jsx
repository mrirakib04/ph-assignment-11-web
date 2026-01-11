import { useContext, useState } from "react";
import { HeadProvider, Title } from "react-head";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Chip,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  MdSearch,
  MdLocalShipping,
  MdOutlineReceipt,
  MdLocationOn,
  MdUpdate,
  MdFileDownload,
  MdLayers,
} from "react-icons/md";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import MainContext from "../../../../Context/MainContext";

const UserTrackOrder = () => {
  const { theme } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();

  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      toast.error("Please enter your Order ID");
      return;
    }

    setLoading(true);
    setOrder(null);

    try {
      const res = await AxiosPublic.get(`/orders/track/${orderId}`);
      if (!res.data?._id) {
        toast.warning("No order found with this ID");
      }
      setOrder(res.data);
    } catch (error) {
      toast.error("Order not found or Server error");
    } finally {
      setLoading(false);
    }
  };

  // download invoice
  const handleDownloadPDF = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.text("NextRun Tracker", 75, 20);
    doc.setFontSize(18);
    doc.text("Order Invoice", 14, 40);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 52);
    doc.text(`Product: ${order.productTitle}`, 14, 60);
    doc.text(`Quantity: ${order.orderQuantity}`, 14, 70);
    doc.text(`Payment Status: ${order.paymentStatus}`, 14, 86);
    doc.text(`Order Status: ${order.orderStatus}`, 14, 94);
    doc.text(`Buyer Email: ${order.buyerEmail}`, 14, 102);

    autoTable(doc, {
      startY: 112,
      head: [["Field", "Value"]],
      body: [
        ["Total Price", order.totalPrice],
        ["Transaction ID", order.transactionId || "N/A"],
        ["Created At", new Date(order.createdAt).toLocaleString()],
      ],
    });

    // ✅ CONDITIONAL TRACKING (OBJECT)
    if (order.tracking) {
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Tracking Field", "Details"]],
        body: [
          ["Status", order.tracking.status || "N/A"],
          ["Location", order.tracking.location || "N/A"],
          ["Note", order.tracking.note || "N/A"],
          ["Updated At", new Date(order.tracking.createdAt).toLocaleString()],
        ],
      });
    }

    doc.save(`order-${order._id}.pdf`);
  };

  // Custom MUI Field Style
  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      "& fieldset": { borderColor: theme === "dark" ? "#334155" : "#e2e8f0" },
      "&.Mui-focused fieldset": { borderColor: "#0ea5e9" },
    },
    "& .MuiInputLabel-root": {
      color: theme === "dark" ? "#94a3b8" : "#64748b",
    },
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-10 flex flex-col items-center ${
        theme === "dark" ? "bg-[#020617]" : "bg-slate-50"
      }`}
    >
      <HeadProvider>
        <Title>Track Order || NextRun Tracker</Title>
      </HeadProvider>

      {/* Hero Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-sky-500/20">
          <MdLocalShipping className="text-3xl text-sky-500" />
        </div>
        <h1
          className={`text-3xl md:text-4xl font-black tracking-tighter ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}
        >
          Track Your <span className="text-sky-500">Package</span>
        </h1>
        <p className="text-slate-500 font-medium mt-2">
          Enter your order ID to get real-time production updates
        </p>
      </div>

      {/* Search Section */}
      <form onSubmit={handleTrack} className="w-full max-w-xl mb-12">
        <div className="flex flex-col md:flex-row gap-3">
          <TextField
            fullWidth
            label="Order ID"
            placeholder="Ex: 65a4b..."
            sx={fieldStyle}
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch className="text-slate-400" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className="md:w-32 h-14! rounded-2xl! bg-sky-500! font-black! shadow-xl! shadow-sky-500/20!"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Track"}
          </Button>
        </div>
      </form>

      {/* Tracking Result Card */}
      {order && order._id && (
        <div
          className={`w-full max-w-3xl rounded-3xl sm:rounded-[2.5rem] border overflow-hidden transition-all duration-500 shadow-2xl ${
            theme === "dark"
              ? "bg-slate-900/80 border-slate-800 shadow-black/50"
              : "bg-white border-slate-200 shadow-slate-200"
          }`}
        >
          {/* Status Banner */}
          <div
            className={`sm:p-8 p-4 border-b ${
              theme === "dark" ? "border-slate-800" : "border-slate-100"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500 mb-1">
                  Active Status
                </p>
                <h2
                  className={`sm:text-2xl text-xl font-black ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  {order.tracking?.status || "Processing Order"}
                </h2>
              </div>
              <div className="flex gap-2">
                <Chip
                  label={order.orderStatus}
                  className="font-bold! uppercase! text-[10px]!"
                  color={
                    order.orderStatus === "approved" ? "success" : "warning"
                  }
                />
                <button
                  onClick={() => handleDownloadPDF(order)}
                  className="p-2 bg-sky-500/10 text-sky-500 rounded-lg hover:bg-sky-500 hover:text-white transition-all"
                >
                  <MdFileDownload size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="sm:p-8 p-4 grid md:grid-cols-2 gap-8">
            {/* Left: Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center text-slate-500">
                  <MdOutlineReceipt size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    Product Title
                  </p>
                  <p
                    className={`font-bold ${
                      theme === "dark" ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {order.productTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center text-slate-500">
                  <MdLayers size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    Quantity & Price
                  </p>
                  <p
                    className={`font-bold ${
                      theme === "dark" ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {order.orderQuantity} Pcs —{" "}
                    <span className="text-sky-500">${order.totalPrice}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Tracking Box */}
            <div
              className={`sm:p-6 p-3 rounded-3xl border ${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-700"
                  : "bg-slate-50 border-slate-100"
              }`}
            >
              <p className="text-[10px] font-black uppercase text-slate-500 mb-4 flex items-center gap-2">
                <MdLocationOn className="text-sky-500 text-xl" /> Current
                Milestone
              </p>

              {order.tracking ? (
                <div className="space-y-3">
                  <p
                    className={`text-base font-bold ${
                      theme === "dark" ? "text-slate-200" : "text-slate-800"
                    }`}
                  >
                    {order.tracking.location || "Central Warehouse"}
                  </p>
                  <p className="text-sm text-slate-500 italic leading-relaxed">
                    "
                    {order.tracking.note ||
                      "Order is being prepared for the next step."}
                    "
                  </p>
                  <div className="flex items-center gap-2 pt-2 lg:text md:text-sm text-[10px] font-bold text-slate-500">
                    <MdUpdate className="text-lg" /> Updated:{" "}
                    {new Date(order.tracking.createdAt).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-xs text-slate-400 font-medium">
                    No tracking updates yet. Production will start soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTrackOrder;
