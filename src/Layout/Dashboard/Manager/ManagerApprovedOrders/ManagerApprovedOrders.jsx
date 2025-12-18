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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
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
  const { user } = useContext(MainContext);
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
    const form = e.target;

    const trackingData = {
      location: form.location.value,
      note: form.note.value,
      status: form.status.value,
    };

    try {
      await AxiosPublic.patch(
        `/orders/tracking/${selectedOrder._id}`,
        trackingData
      );
      toast.success("Tracking updated");
      setOpen(false);
      queryClient.invalidateQueries(["approvedOrders"]);
    } catch {
      toast.error("Failed to update tracking");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Approved Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Approved Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.buyerEmail}</TableCell>
                <TableCell>{order.productTitle}</TableCell>
                <TableCell>{order.orderQuantity}</TableCell>
                <TableCell>
                  {new Date(order.approvedAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      setSelectedOrder(order);

                      setTrackingForm({
                        location: order.tracking?.location || "",
                        note: order.tracking?.note || "",
                        status: order.tracking?.status || "",
                      });

                      setOpen(true);
                    }}
                  >
                    Add Tracking
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No approved orders
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tracking Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
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

export default ManagerApprovedOrders;
