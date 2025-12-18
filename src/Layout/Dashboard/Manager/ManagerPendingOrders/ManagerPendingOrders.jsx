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
  DialogActions,
  Divider,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HeadProvider, Title } from "react-head";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Loader from "../../../../Components/Loader";

const ManagerPendingOrders = () => {
  const { user } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // get manager info
  const { data: userData } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    retry: 3,
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
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AxiosPublic.patch(`/orders/approve/${id}`);
        toast.success("Order approved");
        queryClient.invalidateQueries(["pendingOrders"]);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this order?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AxiosPublic.patch(`/orders/reject/${id}`);
        toast.success("Order rejected");
        queryClient.invalidateQueries(["pendingOrders"]);
      }
    });
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <HeadProvider>
        <Title>Pending Orders || Dashboard</Title>
      </HeadProvider>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Pending Orders
      </Typography>

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
                <TableCell>Order Date</TableCell>
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
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
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
                      sx={{ mx: 1 }}
                      onClick={() => handleReject(order._id)}
                    >
                      Reject
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleView(order)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No pending orders
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* VIEW DIALOG */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagerPendingOrders;
