import { useContext, useState } from "react";
import {
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MdClose, MdLocalShipping, MdPerson } from "react-icons/md";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Loader from "../../../../Components/Loader";

const trackingStatuses = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery",
];

const ManagerApprovedOrders = () => {
  const { user, theme } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [trackingForm, setTrackingForm] = useState({
    location: "",
    note: "",
    status: "",
  });

  // manager info
  const { data: userData } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // approved orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["approvedOrders", userData?.managerFor],
    enabled: !!userData?.managerFor,
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/orders/approved/${userData.managerFor}`
      );
      return res.data;
    },
  });

  const handleAddTracking = async (e) => {
    e.preventDefault();
    try {
      await AxiosPublic.patch(
        `/orders/tracking/${selectedOrder._id}`,
        trackingForm
      );
      toast.success("Tracking updated successfully");
      setOpen(false);
      queryClient.invalidateQueries(["approvedOrders"]);
    } catch {
      toast.error("Failed to update tracking");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );

  // MUI Style for dialog inputs
  const muiFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px !important",
      color: theme === "dark" ? "#f8fafc !important" : "inherit !important",
      "& fieldset": {
        borderColor:
          theme === "dark"
            ? "rgba(255, 255, 255, 0.1) !important"
            : "rgba(0, 0, 0, 0.1) !important",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0ea5e9 !important",
      },
    },
    "& .MuiInputLabel-root": {
      color:
        theme === "dark"
          ? "rgba(255, 255, 255, 0.5) !important"
          : "rgba(0, 0, 0, 0.6) !important",
    },
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-10 ${
        theme === "dark" ? "bg-[#020617]" : "bg-slate-50"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto p-3 sm:p-6 md:p-10 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 shadow-2xl ${
          theme === "dark"
            ? "bg-slate-900/80 border-slate-800 shadow-black/50"
            : "bg-white border-slate-200 shadow-slate-200"
        }`}
      >
        {/* Header */}
        <div className="mb-10">
          <h1
            className={`sm:text-3xl text-xl md:text-4xl font-black tracking-tighter flex items-center gap-3 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            <MdLocalShipping className="text-sky-500" />
            Approved <span className="text-sky-500">Orders</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage production timeline and shipping updates
          </p>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                <th className="px-6 py-3">Order Details</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className={`group transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-slate-800/40 hover:bg-slate-800/60"
                      : "bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50"
                  }`}
                >
                  <td className="px-6 py-4 rounded-l-2xl">
                    <p
                      className={`font-bold ${
                        theme === "dark" ? "text-slate-200" : "text-slate-800"
                      }`}
                    >
                      {order.productTitle}
                    </p>
                    <p className="text-[10px] text-nowrap font-mono text-slate-500 mt-1 uppercase tracking-tighter">
                      ID: {order._id}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MdPerson className="text-sky-500" />
                      <span
                        className={`text-sm font-medium ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {order.buyerEmail}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-sky-500">
                    {order.orderQuantity} pcs
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 text-nowrap rounded-full text-[10px] font-black uppercase tracking-widest ${
                        order.tracking?.status
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      }`}
                    >
                      {order.tracking?.status || "Pending Production"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right rounded-r-2xl">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setTrackingForm({
                          location: order.tracking?.location || "",
                          note: order.tracking?.note || "",
                          status: order.tracking?.status || "",
                        });
                        setOpen(true);
                      }}
                      className="px-4 py-2 text-nowrap rounded-xl bg-sky-500 text-white text-xs font-bold hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/30"
                    >
                      Update Tracking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 grayscale opacity-20">📦</div>
              <p className="text-slate-500 font-bold">
                No approved orders found
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tracking Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "28px",
            bgcolor: theme === "dark" ? "#0f172a" : "#fff",
            backgroundImage: "none",
            border: theme === "dark" ? "1px solid #1e293b" : "none",
            padding: "10px",
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
          <div>
            <span
              className={`text-xl font-black ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Track Update
            </span>
            <p className="text-[10px] text-sky-500 font-bold uppercase tracking-widest mt-1">
              Order Production Cycle
            </p>
          </div>
          <IconButton
            onClick={() => setOpen(false)}
            size="small"
            sx={{ color: "slate.500" }}
          >
            <MdClose />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <form onSubmit={handleAddTracking} className="space-y-5!">
            <TextField
              label="Current Location"
              required
              fullWidth
              sx={muiFieldStyle}
              value={trackingForm.location}
              onChange={(e) =>
                setTrackingForm({ ...trackingForm, location: e.target.value })
              }
            />

            <TextField
              select
              label="Production Status"
              required
              fullWidth
              sx={muiFieldStyle}
              value={trackingForm.status}
              onChange={(e) =>
                setTrackingForm({ ...trackingForm, status: e.target.value })
              }
            >
              {trackingStatuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Internal Note"
              multiline
              rows={3}
              fullWidth
              sx={muiFieldStyle}
              placeholder="Ex: Fabric cutting in progress..."
              value={trackingForm.note}
              onChange={(e) =>
                setTrackingForm({ ...trackingForm, note: e.target.value })
              }
            />

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-linear-to-r from-sky-500 to-indigo-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-sky-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Confirm Update
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagerApprovedOrders;
