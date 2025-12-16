import { useContext, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loader from "../../../../Components/Loader";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import MainContext from "../../../../Context/MainContext";

const AdminManageUsers = () => {
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const { user } = useContext(MainContext);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });

  console.log(users);

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // role update
  const handleRoleChange = async (id, role) => {
    await AxiosPublic.patch(`/users/role/${id}`, { role });
    toast.success("Role updated");
    queryClient.invalidateQueries(["allUsers"]);
  };

  // suspend user
  const handleSuspend = (id) => {
    Swal.fire({
      title: "Suspend User",
      input: "textarea",
      inputLabel: "Suspend Reason",
      inputPlaceholder: "Why are you suspending this user?",
      showCancelButton: true,
      confirmButtonText: "Suspend",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AxiosPublic.patch(`/users/suspend/${id}`, {
          suspendReason: result.value,
        });
        toast.success("User suspended");
        queryClient.invalidateQueries(["allUsers"]);
      }
    });
  };

  // activate user
  const handleActivate = async (id) => {
    await AxiosPublic.patch(`/users/activate/${id}`);
    toast.success("User activated");
    queryClient.invalidateQueries(["allUsers"]);
  };

  // assign manager
  const handleAssign = async (userEmail) => {
    try {
      const res = await AxiosPublic.put(`/users/assign/${userEmail}`, {
        managerFor: user.email,
      });

      if (res.status === 200) {
        toast.success("Manager assigned successfully");
        queryClient.invalidateQueries(["allUsers"]);
      }
    } catch (err) {
      toast.error("Failed to assign Manager");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Manage Users
      </Typography>

      <TextField
        size="small"
        placeholder="Search by name or email"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>

                <TableCell>
                  <Select
                    size="small"
                    defaultValue={user.role}
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    disabled={user.role === "Admin"}
                  >
                    <MenuItem value="Buyer">Buyer</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem disabled value="Admin">
                      Admin
                    </MenuItem>
                  </Select>
                </TableCell>

                <TableCell>
                  {(user.status === "suspended" && "Suspended") ||
                    (user.status === "pending" && "Pending") ||
                    "Active"}
                </TableCell>

                <TableCell>
                  {user.status === "suspended" ? (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleActivate(user._id)}
                    >
                      Activate
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => handleSuspend(user._id)}
                        disabled={user.role === "Admin"}
                      >
                        Suspend
                      </Button>
                      {!user?.managerFor && user.role === "Manager" && (
                        <Button
                          color="primary"
                          size="small"
                          variant="contained"
                          sx={{ ml: 1 }}
                          onClick={() => handleAssign(user.email)}
                        >
                          Assign
                        </Button>
                      )}
                      {user?.managerFor && user.role === "Manager" && (
                        <Button
                          color="error"
                          size="small"
                          variant="contained"
                          sx={{ ml: 1 }}
                          onClick={() => handleAssign(user.email)}
                        >
                          Remove
                        </Button>
                      )}
                      {user.status === "pending" && user.role !== "Admin" && (
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ ml: 1 }}
                          onClick={() => handleActivate(user._id)}
                        >
                          Approve
                        </Button>
                      )}
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminManageUsers;
