import { useContext, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  MenuItem,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Loader from "../../../../Components/Loader";
import {
  MdVisibility,
  MdLocalShipping,
  MdCheckCircle,
  MdCancel,
  MdSearch,
  MdFilterList,
} from "react-icons/md";

const statuses = ["pending", "approved", "rejected", "cancelled"];
const trackingStatuses = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery",
];

const AdminAllOrders = () => {
  const { user, theme } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [viewOpen, setViewOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingForm, setTrackingForm] = useState({
    location: "",
    note: "",
    status: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["adminAllOrders", page, search, status],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/admin/all-orders/${user.email}?page=${page}&search=${search}&status=${status}`
      );
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Confirm Approval?",
      text: "This order will be moved to the production/tracking phase.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      confirmButtonColor: "#10b981",
    });
    if (confirm.isConfirmed) {
      await AxiosPublic.patch(`/orders/approve/${id}`);
      toast.success("Order Approved Successfully");
      queryClient.invalidateQueries(["adminAllOrders"]);
    }
  };

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject Order?",
      text: "Are you sure you want to reject this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Reject",
    });
    if (confirm.isConfirmed) {
      await AxiosPublic.patch(`/orders/reject/${id}`);
      toast.warn("Order Rejected");
      queryClient.invalidateQueries(["adminAllOrders"]);
    }
  };

  const handleOpenTracking = (order) => {
    setSelectedOrder(order);
    setTrackingForm({
      location: order.tracking?.location || "",
      note: order.tracking?.note || "",
      status: order.tracking?.status || "",
    });
    setTrackingOpen(true);
  };

  const handleAddTracking = async (e) => {
    e.preventDefault();
    try {
      await AxiosPublic.patch(
        `/orders/tracking/${selectedOrder._id}`,
        trackingForm
      );
      toast.success("Tracking Updated");
      setTrackingOpen(false);
      queryClient.invalidateQueries(["adminAllOrders"]);
    } catch {
      toast.error("Update Failed");
    }
  };

  const getStatusColor = (s) => {
    switch (s) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: theme === "dark" ? "white" : "inherit",
      borderRadius: "10px",
      bgcolor: theme === "dark" ? "#1e293b" : "#f8fafc",
    },
  };

  return (
    <section
      className={`min-h-screen p-3 md:p-8 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="md:text-3xl sm:text-2xl text-xl font-black uppercase tracking-tighter">
            Order <span className="text-sky-500">Management</span>
          </h1>
          <p className="text-xs font-bold opacity-50 uppercase tracking-[2px]">
            Handle and track customer requests
          </p>
        </div>

        {/* Filters Panel */}
        <div
          className={`p-4 rounded-2xl border mb-6 flex flex-wrap gap-4 items-center ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-100 shadow-sm"
          }`}
        >
          <TextField
            label="Search ID or Product"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ ...inputStyle }}
            InputProps={{
              endAdornment: <MdSearch className="opacity-40 text-xl" />,
            }}
          />
          <TextField
            select
            size="small"
            label="Filter Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ ...inputStyle, minWidth: 150 }}
          >
            <MenuItem value="">All Orders</MenuItem>
            {statuses.map((s) => (
              <MenuItem
                key={s}
                value={s}
                className="uppercase text-xs font-bold"
              >
                {s}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* Table Container */}
        {isLoading ? (
          <Loader />
        ) : (
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid",
              borderColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
              bgcolor: theme === "dark" ? "#0f172a" : "white",
            }}
          >
            <Table>
              <TableHead
                sx={{ bgcolor: theme === "dark" ? "#1e293b" : "#f8fafc" }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "800",
                      textTransform: "uppercase",
                      fontSize: "12px",
                      color: theme === "dark" ? "#94a3b8" : "#64748b",
                    }}
                  >
                    Order ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "800",
                      textTransform: "uppercase",
                      fontSize: "12px",
                      color: theme === "dark" ? "#94a3b8" : "#64748b",
                    }}
                  >
                    Customer
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "800",
                      textTransform: "uppercase",
                      fontSize: "12px",
                      color: theme === "dark" ? "#94a3b8" : "#64748b",
                    }}
                  >
                    Product Info
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "800",
                      textTransform: "uppercase",
                      fontSize: "12px",
                      color: theme === "dark" ? "#94a3b8" : "#64748b",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "800",
                      textTransform: "uppercase",
                      fontSize: "12px",
                      color: theme === "dark" ? "#94a3b8" : "#64748b",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.orders?.map((order) => (
                  <TableRow
                    key={order._id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{ color: theme === "dark" ? "white" : "inherit" }}
                    >
                      <span className="font-mono text-xs opacity-60">
                        #{order._id.slice(-6)}
                      </span>
                    </TableCell>
                    <TableCell
                      sx={{ color: theme === "dark" ? "white" : "inherit" }}
                    >
                      <p className="text-sm font-bold">
                        {order.buyerEmail.split("@")[0]}
                      </p>
                      <p className="text-[10px] opacity-50">
                        {order.buyerEmail}
                      </p>
                    </TableCell>
                    <TableCell
                      sx={{ color: theme === "dark" ? "white" : "inherit" }}
                    >
                      <p className="text-sm font-bold truncate max-w-[150px]">
                        {order.productTitle}
                      </p>
                      <p className="text-[10px] uppercase font-black text-sky-500">
                        Qty: {order.orderQuantity}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.orderStatus}
                        size="small"
                        color={getStatusColor(order.orderStatus)}
                        sx={{
                          fontWeight: "900",
                          textTransform: "uppercase",
                          fontSize: "10px",
                          borderRadius: "6px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center gap-1">
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedOrder(order);
                              setViewOpen(true);
                            }}
                          >
                            <MdVisibility className="text-sky-500" />
                          </IconButton>
                        </Tooltip>

                        {order.orderStatus === "rejected" && (
                          <Tooltip title="Approve">
                            <IconButton
                              size="small"
                              onClick={() => handleApprove(order._id)}
                            >
                              <MdCheckCircle className="text-emerald-500" />
                            </IconButton>
                          </Tooltip>
                        )}

                        {order.orderStatus === "pending" && (
                          <>
                            <Tooltip title="Approve">
                              <IconButton
                                size="small"
                                onClick={() => handleApprove(order._id)}
                              >
                                <MdCheckCircle className="text-emerald-500" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject">
                              <IconButton
                                size="small"
                                onClick={() => handleReject(order._id)}
                              >
                                <MdCancel className="text-rose-500" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}

                        {order.orderStatus === "approved" && (
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<MdLocalShipping />}
                            onClick={() => handleOpenTracking(order)}
                            sx={{
                              fontSize: "10px",
                              fontWeight: "900",
                              bgcolor: "#0ea5e9",
                              borderRadius: "8px",
                            }}
                          >
                            Track
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <Pagination
            count={data?.totalPages || 1}
            page={page}
            onChange={(e, v) => setPage(v)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme === "dark" ? "white" : "inherit",
              },
            }}
          />
        </div>

        {/* --- Dialogs --- */}
        {/* View Details Dialog */}
        <Dialog
          open={viewOpen}
          onClose={() => setViewOpen(false)}
          fullWidth
          maxWidth="xs"
          PaperProps={{
            sx: {
              borderRadius: "20px",
              bgcolor: theme === "dark" ? "#0f172a" : "white",
              color: theme === "dark" ? "white" : "inherit",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: "900", textTransform: "uppercase" }}>
            Order Specs
          </DialogTitle>
          <DialogContent
            dividers
            sx={{ borderColor: theme === "dark" ? "#1e293b" : "#f1f5f9" }}
          >
            {selectedOrder && (
              <div className="space-y-3 py-2">
                <div className="flex justify-between">
                  <span className="opacity-50">Buyer</span>
                  <span className="font-bold">{selectedOrder.buyerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-50">Product</span>
                  <span className="font-bold">
                    {selectedOrder.productTitle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-50">Amount</span>
                  <span className="font-bold text-sky-500">
                    ${selectedOrder.totalPrice}
                  </span>
                </div>
                <Divider
                  sx={{
                    my: 2,
                    borderColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
                  }}
                />
                <p className="text-[10px] font-black uppercase opacity-40 mb-1">
                  Shipping Address
                </p>
                <p className="text-sm italic">{selectedOrder.address}</p>
              </div>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setViewOpen(false)}
              fullWidth
              variant="outlined"
              sx={{ borderRadius: "10px" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Tracking Update Dialog */}
        <Dialog
          open={trackingOpen}
          onClose={() => setTrackingOpen(false)}
          fullWidth
          maxWidth="xs"
          PaperProps={{
            sx: {
              borderRadius: "20px",
              bgcolor: theme === "dark" ? "#0f172a" : "white",
              color: theme === "dark" ? "white" : "inherit",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: "900", textTransform: "uppercase" }}>
            Update Tracking
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleAddTracking} className="space-y-4! pt-4!">
              <TextField
                select
                fullWidth
                label="Current Status"
                value={trackingForm.status}
                onChange={(e) =>
                  setTrackingForm({ ...trackingForm, status: e.target.value })
                }
                sx={inputStyle}
              >
                {trackingStatuses.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Current Location"
                value={trackingForm.location}
                onChange={(e) =>
                  setTrackingForm({ ...trackingForm, location: e.target.value })
                }
                sx={inputStyle}
              />
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Internal Note"
                value={trackingForm.note}
                onChange={(e) =>
                  setTrackingForm({ ...trackingForm, note: e.target.value })
                }
                sx={inputStyle}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: "900",
                  bgcolor: "#10b981",
                }}
              >
                Save Changes
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AdminAllOrders;
