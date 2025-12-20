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
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Loader from "../../../../Components/Loader";

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
  const { user } = useContext(MainContext);
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
      title: "Approve order?",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });
    if (confirm.isConfirmed) {
      await AxiosPublic.patch(`/orders/approve/${id}`);
      toast.success("Order approved");
      queryClient.invalidateQueries(["adminAllOrders"]);
    }
  };

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });
    if (confirm.isConfirmed) {
      await AxiosPublic.patch(`/orders/reject/${id}`);
      toast.success("Order rejected");
      queryClient.invalidateQueries(["adminAllOrders"]);
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setViewOpen(true);
  };

  const handleCloseView = () => {
    setViewOpen(false);
    setSelectedOrder(null);
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
      toast.success("Tracking updated");
      setTrackingOpen(false);
      queryClient.invalidateQueries(["adminAllOrders"]);
    } catch {
      toast.error("Failed to update tracking");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        All Orders
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          size="small"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Table */}
      {isLoading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data?.orders || []).map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.buyerEmail}</TableCell>
                  <TableCell>{order.productTitle}</TableCell>
                  <TableCell>{order.orderQuantity}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell className="flex! gap-2" align="center">
                    {order.orderStatus === "pending" && (
                      <>
                        <Button
                          size="small"
                          color="success"
                          onClick={() => handleApprove(order._id)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleReject(order._id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleView(order)}
                    >
                      View
                    </Button>
                    {order.orderStatus === "approved" && (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleOpenTracking(order)}
                      >
                        Add Tracking
                      </Button>
                    )}

                    {order.orderStatus === "approved" && (
                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => handleReject(order._id)}
                      >
                        Reject
                      </Button>
                    )}
                    {order.orderStatus === "rejected" && (
                      <Button
                        size="small"
                        color="success"
                        variant="contained"
                        onClick={() => handleApprove(order._id)}
                      >
                        Approve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {!data?.orders?.length && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={data?.totalPages || 1}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>

      {/* View Dialog */}
      <Dialog open={viewOpen} onClose={handleCloseView} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <>
              <Typography>
                <b>Order ID:</b> {selectedOrder._id}
              </Typography>
              <Typography>
                <b>Buyer:</b> {selectedOrder.buyerEmail}
              </Typography>
              <Typography>
                <b>Product:</b> {selectedOrder.productTitle}
              </Typography>
              <Typography>
                <b>Quantity:</b> {selectedOrder.orderQuantity}
              </Typography>
              <Typography>
                <b>Total Price:</b> ${selectedOrder.totalPrice}
              </Typography>
              <Typography>
                <b>Payment:</b> {selectedOrder.paymentOption}
              </Typography>
              <Typography>
                <b>Status:</b> {selectedOrder.orderStatus}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>
                <b>Address:</b> {selectedOrder.address}
              </Typography>
              <Typography>
                <b>Notes:</b> {selectedOrder.notes || "N/A"}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tracking Dialog */}
      <Dialog
        open={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        fullWidth
      >
        <DialogTitle>Add Tracking Update</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddTracking} className="flex flex-col gap-3">
            <TextField
              label="Location"
              name="location"
              required
              fullWidth
              value={trackingForm.location}
              onChange={(e) =>
                setTrackingForm({ ...trackingForm, location: e.target.value })
              }
            />
            <TextField
              label="Note"
              name="note"
              multiline
              rows={2}
              fullWidth
              value={trackingForm.note}
              onChange={(e) =>
                setTrackingForm({ ...trackingForm, note: e.target.value })
              }
            />
            <TextField
              select
              label="Status"
              name="status"
              required
              fullWidth
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
            <Button type="submit" variant="contained">
              Save Tracking
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminAllOrders;
