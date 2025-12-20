import { useContext, useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";

import Loader from "../../../../Components/Loader";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UserMyOrders = () => {
  const { user } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [page] = useState(1);
  const [status] = useState("");
  const [search] = useState("");

  const [openView, setOpenView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["myOrders", user?.email, page, search, status],
    enabled: !!user?.email,
    retry: 3,
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/my-orders/${user.email}?page=${page}&status=${status}&search=${search}`
      );
      return res.data;
    },
  });

  // cancel order (pending only)
  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel this order?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      await AxiosPublic.patch(`/orders/cancel/${id}`);
      toast.success("Order cancelled successfully");
      queryClient.invalidateQueries(["myOrders"]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel order");
    }
  };

  // copy order id
  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("Order ID copied");
  };

  // view order
  const handleView = (order) => {
    setSelectedOrder(order);
    setOpenView(true);
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
    <div className="p-5">
      <Typography variant="h5" fontWeight="bold" mb={3}>
        My Orders
      </Typography>

      {isLoading ? (
        <Loader />
      ) : data?.orders?.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell
                  onClick={() => handleCopyId(order._id)}
                  sx={{ cursor: "pointer", color: "primary.main" }}
                >
                  {order._id}
                </TableCell>

                <TableCell className="truncate min-w-2">
                  {order.productTitle}
                </TableCell>
                <TableCell>{order.orderQuantity}</TableCell>

                <TableCell>
                  <Chip
                    label={order.orderStatus}
                    color={
                      order.orderStatus === "approved"
                        ? "success"
                        : order.orderStatus === "rejected"
                        ? "error"
                        : "warning"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  {order.paymentStatus === "paid" ? "Paid" : "Pending"}
                </TableCell>

                <TableCell sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleView(order)}
                  >
                    View
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => handleDownloadPDF(order)}
                  >
                    Download
                  </Button>

                  {order.orderStatus === "pending" && (
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => handleCancel(order._id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* VIEW MODAL */}
      <Dialog
        open={openView}
        onClose={() => {
          setOpenView(false);
          setSelectedOrder(null);
        }}
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div className="flex flex-col gap-2">
              <p>
                <b>Order ID:</b> {selectedOrder._id}
              </p>
              <p>
                <b>Product:</b> {selectedOrder.productTitle}
              </p>
              <p>
                <b>Quantity:</b> {selectedOrder.orderQuantity}
              </p>
              <p>
                <b>Status:</b> {selectedOrder.orderStatus}
              </p>
              <p>
                <b>Payment:</b> {selectedOrder.paymentStatus}
              </p>
              <p>
                <b>Total:</b> {selectedOrder.totalPrice}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserMyOrders;
