import { useState } from "react";
import { HeadProvider, Title } from "react-head";
import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";

const UserTrackOrder = () => {
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
      toast.error("Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  // download invoice
  const handleDownloadPDF = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Order Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 32);
    doc.text(`Product: ${order.productTitle}`, 14, 40);
    doc.text(`Quantity: ${order.orderQuantity}`, 14, 48);
    doc.text(`Payment Status: ${order.paymentStatus}`, 14, 56);
    doc.text(`Order Status: ${order.orderStatus}`, 14, 64);
    doc.text(`Buyer Email: ${order.buyerEmail}`, 14, 72);

    autoTable(doc, {
      startY: 82,
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

  return (
    <div className="flex flex-col items-center px-5 py-10 gap-5">
      <HeadProvider>
        <Title>Track Order</Title>
      </HeadProvider>

      <Typography variant="h4" fontWeight="bold">
        Track Your Order
      </Typography>

      {/* Search box */}
      <form
        onSubmit={handleTrack}
        className="w-full max-w-md flex gap-3 items-center"
      >
        <TextField
          fullWidth
          label="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={22} color="inherit" /> : "Track"}
        </Button>
      </form>

      {/* Order result */}
      {order && order._id && (
        <div className="w-full max-w-3xl border rounded-lg p-5 bg-white shadow flex flex-col gap-3">
          <Typography variant="h6" fontWeight="bold">
            Order Details
          </Typography>

          <Divider />

          <p>
            <b>Order ID:</b> {order._id}
          </p>
          <p>
            <b>Product:</b> {order.productTitle}
          </p>
          <p>
            <b>Quantity:</b> {order.orderQuantity}
          </p>
          <p>
            <b>Total:</b> ৳{order.totalPrice}
          </p>
          <p>
            <b>Email:</b> {order.buyerEmail}
          </p>

          <div className="flex gap-2 flex-wrap">
            <Chip
              label={`Order: ${order.orderStatus}`}
              color={
                order.orderStatus === "approved"
                  ? "secondary"
                  : order.orderStatus === "pending"
                  ? "info"
                  : order.orderStatus === "rejected"
                  ? "error"
                  : "warning"
              }
            />
            <Chip
              label={`Payment: ${order.paymentStatus}`}
              color={order.paymentStatus === "paid" ? "success" : "warning"}
            />
          </div>

          {/* Tracking info (conditional) */}
          {order.tracking && (
            <>
              <Divider />
              <Typography fontWeight="bold">Tracking Info</Typography>

              <p>
                <b>Status:</b> {order.tracking.status}
              </p>
              <p>
                <b>Note:</b> {order.tracking.note}
              </p>
              <p>
                <b>Location:</b> {order.tracking.location}
              </p>
              <p>
                <b>Updated:</b>{" "}
                {new Date(order.tracking.createdAt).toLocaleString()}
              </p>
            </>
          )}

          <Button
            size="small"
            variant="contained"
            color="primary"
            align="right"
            className="w-fit! p-2! px-4! font-semibold!"
            onClick={() => handleDownloadPDF(order)}
          >
            Download Invoice
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserTrackOrder;
