import { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HeadProvider, Title } from "react-head";
import {
  MdHourglassEmpty,
  MdCheckCircle,
  MdCancel,
  MdVisibility,
  MdClose,
  MdOutlineEmail,
  MdPayment,
  MdLocationOn,
  MdInfoOutline,
} from "react-icons/md";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Loader from "../../../../Components/Loader";

const ManagerPendingOrders = () => {
  const { user, theme } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // get manager info
  const { data: userData } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // get pending orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["pendingOrders", userData?.managerFor],
    enabled: !!userData?.managerFor,
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/orders/pending/${userData.managerFor}`
      );
      return res.data;
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve this order?",
      text: "This will move the order to production.",
      icon: "question",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      confirmButtonText: "Yes, Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AxiosPublic.patch(`/orders/approve/${id}`);
        toast.success("Order moved to approved list");
        queryClient.invalidateQueries(["pendingOrders"]);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this order?",
      text: "This action cannot be undone!",
      icon: "warning",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Confirm Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AxiosPublic.patch(`/orders/reject/${id}`);
        toast.success("Order has been rejected");
        queryClient.invalidateQueries(["pendingOrders"]);
      }
    });
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
        <Title>Pending Orders || Dashboard</Title>
      </HeadProvider>

      <div
        className={`max-w-6xl mx-auto p-6 md:p-10 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 shadow-2xl ${
          theme === "dark"
            ? "bg-slate-900/80 border-slate-800 shadow-black/50"
            : "bg-white border-slate-200 shadow-slate-200"
        }`}
      >
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1
              className={`sm:text-3xl text-2xl md:text-4xl font-black tracking-tighter flex items-center gap-3 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              <MdHourglassEmpty className="text-amber-500 animate-pulse" />
              Pending <span className="text-sky-500">Orders</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.2em]">
              Needs Review & Verification
            </p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-2xl">
            <span className="text-amber-500 font-black text-xl">
              {orders.length}
            </span>
            <span className="text-amber-500/70 text-xs font-bold ml-2 uppercase">
              Awaiting
            </span>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest px-6">
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Product Info</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className={`group transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-slate-800/40 hover:bg-slate-800/60"
                      : "bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/40"
                  }`}
                >
                  <td className="px-6 py-5 rounded-l-3xl">
                    <p
                      className={`font-mono text-xs ${
                        theme === "dark" ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-bold ${
                          theme === "dark" ? "text-slate-200" : "text-slate-700"
                        }`}
                      >
                        {order.buyerEmail.split("@")[0]}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {order.buyerEmail}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p
                      className={`text-sm text-nowrap font-black ${
                        theme === "dark" ? "text-sky-400" : "text-sky-600"
                      }`}
                    >
                      {order.productTitle}
                    </p>
                    <p className="text-xs font-bold text-slate-500">
                      QTY: {order.orderQuantity}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-right rounded-r-3xl">
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip title="Approve Order">
                        <IconButton
                          onClick={() => handleApprove(order._id)}
                          className="bg-emerald-500/10! hover:bg-emerald-500! text-emerald-500! hover:text-white! transition-all!"
                        >
                          <MdCheckCircle size={20} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject Order">
                        <IconButton
                          onClick={() => handleReject(order._id)}
                          className="bg-rose-500/10! hover:bg-rose-500! text-rose-500! hover:text-white! transition-all!"
                        >
                          <MdCancel size={20} />
                        </IconButton>
                      </Tooltip>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setOpen(true);
                        }}
                        className={`ml-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                          theme === "dark"
                            ? "bg-slate-700 text-white hover:bg-slate-600"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm"
                        }`}
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="text-center py-20 bg-slate-500/5 rounded-4xl border border-dashed border-slate-500/20">
              <MdInfoOutline className="text-5xl mx-auto text-slate-500/30 mb-4" />
              <p className="text-slate-500 font-bold">
                No pending orders at the moment
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "32px",
            bgcolor: theme === "dark" ? "#0f172a" : "#fff",
            backgroundImage: "none",
            border:
              theme === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.05)",
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            className={`text-xl font-black ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Order Summary
          </span>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ color: "slate.500" }}
          >
            <MdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }} dividers={false}>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-2xl bg-slate-500/5">
                  <p className="text-[10px] uppercase font-bold text-slate-500 mb-1 flex items-center gap-1">
                    <MdPayment /> Payment
                  </p>
                  <p
                    className={`text-xs font-bold ${
                      theme === "dark" ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {selectedOrder.paymentOption}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-500/5">
                  <p className="text-[10px] uppercase font-bold text-slate-500 mb-1 flex items-center gap-1">
                    <MdOutlineEmail /> Total Price
                  </p>
                  <p className="text-xs font-black text-sky-500">
                    ${selectedOrder.totalPrice}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-2 flex items-center gap-1">
                  <MdLocationOn /> Delivery Address
                </p>
                <div
                  className={`p-4 rounded-2xl border ${
                    theme === "dark"
                      ? "bg-slate-800/50 border-slate-700 text-slate-400"
                      : "bg-slate-50 border-slate-100 text-slate-600"
                  } text-xs leading-relaxed`}
                >
                  {selectedOrder.address}
                </div>
              </div>

              {selectedOrder.notes && (
                <div
                  className={`p-4 rounded-2xl border-l-4 border-sky-500 ${
                    theme === "dark"
                      ? "bg-sky-500/5 text-slate-400"
                      : "bg-sky-50 text-slate-600"
                  }`}
                >
                  <p className="text-[10px] uppercase font-black text-sky-500 mb-1">
                    Customer Note
                  </p>
                  <p className="text-xs italic">"{selectedOrder.notes}"</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    handleApprove(selectedOrder._id);
                    setOpen(false);
                  }}
                  className="flex-1 py-3 bg-emerald-500 text-white rounded-xl text-xs font-black hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                >
                  Approve Now
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className={`flex-1 py-3 rounded-xl text-xs font-black border ${
                    theme === "dark"
                      ? "border-slate-700 text-slate-400"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagerPendingOrders;
