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
  Chip,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loader from "../../../../Components/Loader";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import MainContext from "../../../../Context/MainContext";
import { HeadProvider, Title } from "react-head";
import {
  MdSearch,
  MdSecurity,
  MdPerson,
  MdBlock,
  MdCheckCircle,
  MdAssignmentInd,
  MdLinkOff,
} from "react-icons/md";

const AdminManageUsers = () => {
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const { user, theme } = useContext(MainContext);
  const adminEmail = user?.email;

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleRoleChange = async (id, role) => {
    try {
      await AxiosPublic.patch(`/users/role/${id}`, { role });
      toast.success(`Role updated to ${role}`);
      queryClient.invalidateQueries(["allUsers"]);
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleSuspend = (id) => {
    Swal.fire({
      title: "Confirm Suspension",
      text: "Explain the reason for suspending this account",
      input: "textarea",
      inputPlaceholder: "Violation of terms, suspicious activity, etc.",
      showCancelButton: true,
      confirmButtonText: "Suspend Now",
      confirmButtonColor: "#ef4444",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        await AxiosPublic.patch(`/users/suspend/${id}`, {
          suspendReason: result.value,
        });
        toast.warn("User account suspended");
        queryClient.invalidateQueries(["allUsers"]);
      }
    });
  };

  const handleActivate = async (id) => {
    await AxiosPublic.patch(`/users/activate/${id}`);
    toast.success("Account Restored Successfully");
    queryClient.invalidateQueries(["allUsers"]);
  };

  const handleAssign = async (userEmail) => {
    try {
      await AxiosPublic.put(`/users/assign/${userEmail}`, {
        managerFor: user.email,
      });
      toast.success("Manager Assigned to System");
      queryClient.invalidateQueries(["allUsers"]);
    } catch (err) {
      toast.error("Failed to assign");
    }
  };

  const handleDischarge = async (userEmail) => {
    try {
      await AxiosPublic.put(`/users/discharge/${userEmail}`, {
        managerFor: "",
      });
      toast.info("Manager Discharged");
      queryClient.invalidateQueries(["allUsers"]);
    } catch (err) {
      toast.error("Failed to discharge");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <section
      className={`min-h-screen p-5 md:p-8 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>Manage Users || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-7xl mx-auto">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              User <span className="text-sky-500">Directory</span>
            </h1>
            <p className="text-xs font-bold opacity-50 uppercase tracking-[2px]">
              Total Registered Members: {users.length}
            </p>
          </div>

          <TextField
            size="small"
            placeholder="Search users..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: { xs: "100%", md: 350 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: theme === "dark" ? "#1e293b" : "white",
                color: theme === "dark" ? "white" : "inherit",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch className="text-sky-500 text-xl" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* User Table */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: "20px",
            border: "1px solid",
            borderColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
            bgcolor: theme === "dark" ? "#0f172a" : "white",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead
              sx={{ bgcolor: theme === "dark" ? "#1e293b" : "#f8fafc" }}
            >
              <TableRow>
                <TableCell sx={headerStyle(theme)}>User Info</TableCell>
                <TableCell sx={headerStyle(theme)}>Access Level</TableCell>
                <TableCell sx={headerStyle(theme)}>Current Status</TableCell>
                <TableCell align="center" sx={headerStyle(theme)}>
                  Administrative Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((u) => (
                <TableRow
                  key={u._id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* Name & Email Cell */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: u.role === "Admin" ? "#ef4444" : "#0ea5e9",
                          width: 40,
                          height: 40,
                        }}
                      >
                        {u.name?.charAt(0) || <MdPerson />}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="800"
                          sx={{ color: theme === "dark" ? "white" : "inherit" }}
                        >
                          {u.name}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>
                          {u.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Role Selection */}
                  <TableCell>
                    <Select
                      size="small"
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      disabled={u.role === "Admin"}
                      sx={{
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: theme === "dark" ? "white" : "inherit",
                        minWidth: 120,
                        bgcolor: theme === "dark" ? "#1e293b" : "transparent",
                      }}
                    >
                      <MenuItem value="Buyer">Buyer</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem disabled value="Admin">
                        Admin
                      </MenuItem>
                    </Select>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Chip
                        label={
                          u.status === "suspended"
                            ? "Blocked"
                            : u.status === "pending"
                            ? "Awaiting"
                            : "Verified"
                        }
                        size="small"
                        color={
                          u.status === "suspended"
                            ? "error"
                            : u.status === "pending"
                            ? "warning"
                            : "success"
                        }
                        sx={{
                          fontWeight: "900",
                          fontSize: "10px",
                          textTransform: "uppercase",
                          width: "fit-content",
                        }}
                      />
                      {u?.managerFor && (
                        <span className="text-[9px] font-black text-sky-500 uppercase flex items-center gap-1">
                          <MdCheckCircle /> System Assigned
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Actions Buttons */}
                  <TableCell align="center">
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                    >
                      {u.status === "suspended" ? (
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<MdCheckCircle />}
                          onClick={() => handleActivate(u._id)}
                          sx={{
                            borderRadius: "8px",
                            fontSize: "10px",
                            fontWeight: "900",
                          }}
                        >
                          Activate
                        </Button>
                      ) : (
                        <>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            startIcon={<MdBlock />}
                            onClick={() => handleSuspend(u._id)}
                            disabled={u.role === "Admin"}
                            sx={{
                              borderRadius: "8px",
                              fontSize: "10px",
                              fontWeight: "900",
                            }}
                          >
                            Block
                          </Button>

                          {u.role === "Manager" && !u?.managerFor && (
                            <Button
                              color="primary"
                              size="small"
                              variant="contained"
                              startIcon={<MdAssignmentInd />}
                              onClick={() => handleAssign(u.email)}
                              sx={{
                                borderRadius: "8px",
                                fontSize: "10px",
                                fontWeight: "900",
                                bgcolor: "#0ea5e9",
                              }}
                            >
                              Assign
                            </Button>
                          )}

                          {u.managerFor === adminEmail && (
                            <Button
                              color="error"
                              size="small"
                              variant="contained"
                              startIcon={<MdLinkOff />}
                              onClick={() => handleDischarge(u.email)}
                              sx={{
                                borderRadius: "8px",
                                fontSize: "10px",
                                fontWeight: "900",
                              }}
                            >
                              Discharge
                            </Button>
                          )}

                          {u.status === "pending" && u.role !== "Admin" && (
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={() => handleActivate(u._id)}
                              sx={{
                                borderRadius: "8px",
                                fontSize: "10px",
                                fontWeight: "900",
                              }}
                            >
                              Approve
                            </Button>
                          )}
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

const headerStyle = (theme) => ({
  fontWeight: "800",
  textTransform: "uppercase",
  fontSize: "11px",
  letterSpacing: "1px",
  color: theme === "dark" ? "#94a3b8" : "#64748b",
  borderColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
});

export default AdminManageUsers;
