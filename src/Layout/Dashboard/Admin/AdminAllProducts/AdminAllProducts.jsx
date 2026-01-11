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
  Switch,
  Button,
  Avatar,
  IconButton,
  Tooltip,
  Pagination,
  Chip,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Loader from "../../../../Components/Loader";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { HeadProvider, Title } from "react-head";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const AdminAllProducts = () => {
  const { user, theme } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["adminProducts", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/admin/products?owner=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const handleToggleHome = async (id, currentValue) => {
    try {
      await AxiosPublic.patch(`/products/show-home/${id}`, {
        showOnHome: !currentValue,
      });
      toast.success("Home visibility updated!");
      queryClient.invalidateQueries(["adminProducts", user?.email]);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Deletion?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete Product",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AxiosPublic.delete(`/products/${id}`);
        toast.success("Product removed from inventory");
        queryClient.invalidateQueries(["adminProducts", user?.email]);
      }
    });
  };

  return (
    <section
      className={`min-h-screen p-5 md:p-8 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>Products Management || Admin</Title>
      </HeadProvider>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="md:text-3xl sm:text-2xl text-xl font-black uppercase tracking-tighter">
              Product <span className="text-sky-500">Inventory</span>
            </h1>
            <p className="text-xs font-bold opacity-50 uppercase tracking-[2px]">
              Manage your store products and visibility
            </p>
          </div>
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/add-product")}
            sx={{
              bgcolor: "#0ea5e9",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
          >
            + Add New Product
          </Button>
        </div>

        {/* Inventory Table */}
        {isLoading ? (
          <Loader />
        ) : (
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
                  <TableCell sx={headerStyle(theme)}>Info</TableCell>
                  <TableCell sx={headerStyle(theme)}>Category</TableCell>
                  <TableCell sx={headerStyle(theme)}>Price</TableCell>
                  <TableCell sx={headerStyle(theme)}>Owner</TableCell>
                  <TableCell align="center" sx={headerStyle(theme)}>
                    On Home
                  </TableCell>
                  <TableCell align="center" sx={headerStyle(theme)}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product._id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          variant="rounded"
                          src={product.images?.[0]}
                          sx={{ width: 45, height: 45, bgcolor: "#f1f5f9" }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{ color: theme === "dark" ? "white" : "inherit" }}
                        >
                          {product.title}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "10px",
                          color: "#ffffff",
                          background: "#0ea5e9",
                          textTransform: "uppercase",
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ color: "#0ea5e9", fontWeight: "900" }}>
                      ৳{product.price}
                    </TableCell>

                    <TableCell
                      sx={{
                        color: theme === "dark" ? "#94a3b8" : "#64748b",
                        fontSize: "12px",
                      }}
                    >
                      {product.productOwner}
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Toggle Homepage Visibility">
                        <Switch
                          checked={product.showOnHome}
                          onChange={() =>
                            handleToggleHome(product._id, product.showOnHome)
                          }
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#0ea5e9",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              { bgcolor: "#0ea5e9" },
                          }}
                        />
                      </Tooltip>
                    </TableCell>

                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <Tooltip title="Edit Product">
                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(
                                `/dashboard/update-products/${product._id}`
                              )
                            }
                            sx={{
                              color: "#0ea5e9",
                              bgcolor: "rgba(14, 165, 233, 0.1)",
                            }}
                          >
                            <MdEdit />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Permanently">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(product._id)}
                            sx={{
                              color: "#f43f5e",
                              bgcolor: "rgba(244, 63, 94, 0.1)",
                            }}
                          >
                            <MdDeleteForever />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => {
              setPage(value);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme === "dark" ? "white" : "inherit",
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </div>
    </section>
  );
};

// Helper style for table headers
const headerStyle = (theme) => ({
  fontWeight: "800",
  textTransform: "uppercase",
  fontSize: "11px",
  letterSpacing: "1px",
  color: theme === "dark" ? "#94a3b8" : "#64748b",
  borderColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
});

export default AdminAllProducts;
