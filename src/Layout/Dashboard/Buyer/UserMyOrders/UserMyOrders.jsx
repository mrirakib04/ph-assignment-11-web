import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  MdOutlineReceiptLong,
  MdContentCopy,
  MdVisibility,
  MdFileDownload,
  MdOutlineCancel,
  MdClose,
  MdShoppingBag,
} from "react-icons/md";
import Swal from "sweetalert2";

import Loader from "../../../../Components/Loader";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { HeadProvider, Title } from "react-head";

const UserMyOrders = () => {
  const { user, theme } = useContext(MainContext);
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
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/my-orders/${user.email}?page=${page}&status=${status}&search=${search}`
      );
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel this order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, cancel it",
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

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("Order ID copied");
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

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div
      className={`min-h-screen p-4 md:p-10 ${
        theme === "dark" ? "bg-[#020617]" : "bg-slate-50"
      }`}
    >
      <HeadProvider>
        <Title>My Orders || NextRun Tracker</Title>
      </HeadProvider>
      <div
        className={`max-w-6xl mx-auto p-3 sm:p-6 md:p-10 rounded-3xl sm:rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 shadow-2xl ${
          theme === "dark"
            ? "bg-slate-900/80 border-slate-800 shadow-black/50"
            : "bg-white border-slate-200 shadow-slate-200"
        }`}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1
              className={`sm:text-3xl text-2xl md:text-4xl font-black tracking-tighter flex items-center gap-3 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              <MdShoppingBag className="text-sky-500" />
              My <span className="text-sky-500">Orders</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Track and manage your purchase history
            </p>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-6 py-3">Order Ref</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Payment</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.map((order) => (
                <tr
                  key={order._id}
                  className={`group transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-slate-800/40 hover:bg-slate-800/60"
                      : "bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50"
                  }`}
                >
                  <td className="px-6 py-4 rounded-l-3xl">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-xs ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                      <IconButton
                        size="small"
                        onClick={() => handleCopyId(order._id)}
                      >
                        <MdContentCopy size={14} className="text-slate-500" />
                      </IconButton>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className={`text-sm font-bold truncate max-w-[200px] ${
                        theme === "dark" ? "text-slate-200" : "text-slate-700"
                      }`}
                    >
                      {order.productTitle}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold">
                      QTY: {order.orderQuantity}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        order.orderStatus === "approved"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : order.orderStatus === "rejected"
                          ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                          : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div
                      className={`text-xs font-bold ${
                        order.paymentStatus === "paid"
                          ? "text-emerald-500"
                          : "text-amber-500"
                      }`}
                    >
                      {order.paymentStatus === "paid" ? "● Paid" : "○ Pending"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right rounded-r-3xl">
                    <div className="flex items-center justify-end gap-2">
                      <Tooltip title="View Details">
                        <IconButton
                          onClick={() => {
                            setSelectedOrder(order);
                            setOpenView(true);
                          }}
                          className="text-sky-500! bg-sky-500/10! hover:bg-sky-500! hover:text-white!"
                        >
                          <MdVisibility size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download Invoice">
                        <IconButton
                          onClick={() => handleDownloadPDF(order)}
                          className="text-emerald-500! bg-emerald-500/10! hover:bg-emerald-500! hover:text-white!"
                        >
                          <MdFileDownload size={18} />
                        </IconButton>
                      </Tooltip>
                      {order.orderStatus === "pending" && (
                        <Tooltip title="Cancel Order">
                          <IconButton
                            onClick={() => handleCancel(order._id)}
                            className="text-rose-500! bg-rose-500/10! hover:bg-rose-500! hover:text-white!"
                          >
                            <MdOutlineCancel size={18} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data?.orders?.length === 0 && (
            <div className="text-center py-20 opacity-40">
              <MdOutlineReceiptLong className="text-6xl mx-auto mb-4" />
              <p className="font-bold">No purchase history found</p>
            </div>
          )}
        </div>
      </div>

      {/* VIEW MODAL */}
      <Dialog
        open={openView}
        onClose={() => setOpenView(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "32px",
            bgcolor: theme === "dark" ? "#0f172a" : "#fff",
            backgroundImage: "none",
            border: theme === "dark" ? "1px solid #1e293b" : "none",
          },
        }}
      >
        <DialogTitle className="flex justify-between items-center p-6">
          <span
            className={`text-xl font-black ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Order Summary
          </span>
          <IconButton onClick={() => setOpenView(false)} size="small">
            <MdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent className="p-6 space-y-4">
          {selectedOrder && (
            <div className="space-y-3">
              <div
                className={`p-4 rounded-2xl ${
                  theme === "dark" ? "bg-slate-800/50" : "bg-slate-50"
                }`}
              >
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">
                  Product Details
                </p>
                <p
                  className={`font-bold ${
                    theme === "dark" ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  {selectedOrder.productTitle}
                </p>
                <p className="text-xs text-sky-500 font-bold mt-1">
                  Quantity: {selectedOrder.orderQuantity}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-3 rounded-2xl border ${
                    theme === "dark" ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <p className="text-[10px] text-slate-500 font-bold">
                    Total Bill
                  </p>
                  <p className="text-lg font-black text-sky-500">
                    ${selectedOrder.totalPrice}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-2xl border ${
                    theme === "dark" ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <p className="text-[10px] text-slate-500 font-bold">
                    Payment
                  </p>
                  <p className="text-sm font-bold capitalize">
                    {selectedOrder.paymentStatus}
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border-l-4 border-amber-500 ${
                  theme === "dark" ? "bg-amber-500/5" : "bg-amber-50"
                }`}
              >
                <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest">
                  Order Status
                </p>
                <p className="text-sm font-bold capitalize">
                  {selectedOrder.orderStatus}
                </p>
              </div>

              <button
                onClick={() => handleDownloadPDF(selectedOrder)}
                className="w-full py-3 mt-2 bg-sky-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/20"
              >
                Download Invoice
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserMyOrders;
