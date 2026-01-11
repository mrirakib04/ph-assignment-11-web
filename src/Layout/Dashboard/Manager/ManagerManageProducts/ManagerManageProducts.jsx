import { useContext, useState } from "react";
import { TextField, Pagination, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  MdSearch,
  MdEdit,
  MdDelete,
  MdInventory2,
  MdPayments,
  MdInfoOutline,
} from "react-icons/md";

import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Loader from "../../../../Components/Loader";
import Swal from "sweetalert2";

const ManagerManageProducts = () => {
  const { user, theme } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // get manager info
  const { data: manager } = useQuery({
    queryKey: ["manager", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // get manager products
  const { data, isLoading } = useQuery({
    queryKey: ["managerProducts", manager?.managerFor, page, search],
    enabled: !!manager?.managerFor,
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/admin/products?owner=${manager.managerFor}&page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!",
      background: theme === "dark" ? "#1e293b" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await AxiosPublic.delete(`/products/${id}`);
          toast.success("Product deleted successfully");
          queryClient.invalidateQueries(["managerProducts"]);
        } catch (err) {
          toast.error("Failed to delete product");
        }
      }
    });
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-10 ${
        theme === "dark" ? "bg-[#020617]" : "bg-slate-50"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto p-6 md:p-10 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 shadow-2xl ${
          theme === "dark"
            ? "bg-slate-900/80 border-slate-800 shadow-black/50"
            : "bg-white border-slate-200 shadow-slate-200"
        }`}
      >
        {/* Header and Search Area */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div>
            <h1
              className={`sm:text-3xl text-xl md:text-4xl font-black tracking-tighter flex items-center gap-3 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              <MdInventory2 className="text-sky-500" />
              Manage <span className="text-sky-500">Products</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Total {data?.products.length || 0} products in your inventory
            </p>
          </div>

          <div className="w-full md:w-96">
            <TextField
              fullWidth
              placeholder="Search by name or category..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdSearch className="text-2xl text-sky-500" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "16px",
                  bgcolor:
                    theme === "dark" ? "rgba(30, 41, 59, 0.5)" : "#f8fafc",
                  color: theme === "dark" ? "white" : "inherit",
                  "& fieldset": { border: "none" },
                },
              }}
            />
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`border-b ${
                    theme === "dark" ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <th className="pb-4 font-bold uppercase text-xs tracking-widest text-slate-500 sm:px-4 px-2">
                    Item
                  </th>
                  <th className="pb-4 font-bold uppercase text-xs tracking-widest text-slate-500 sm:px-4 px-2">
                    Details
                  </th>
                  <th className="pb-4 font-bold uppercase text-xs tracking-widest text-slate-500 sm:px-4 px-2">
                    Price
                  </th>
                  <th className="pb-4 font-bold uppercase text-xs tracking-widest text-slate-500 sm:px-4 px-2">
                    Method
                  </th>
                  <th className="pb-4 font-bold uppercase text-xs tracking-widest text-slate-500 sm:px-4 px-2 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-transparent">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className={`group transition-all ${
                      theme === "dark"
                        ? "hover:bg-slate-800/30"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="py-4 sm:px-4 px-2">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-transparent group-hover:border-sky-500 transition-all">
                        <img
                          src={product.images?.[0]}
                          alt={product.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-duration-500"
                        />
                      </div>
                    </td>

                    <td className="py-4 sm:px-4 px-2">
                      <p
                        className={`font-bold md:text-lg sm:text-base text-sm leading-tight ${
                          theme === "dark" ? "text-slate-200" : "text-slate-800"
                        }`}
                      >
                        {product.title}
                      </p>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/20 mt-1 inline-block">
                        {product.category || "Standard"}
                      </span>
                    </td>

                    <td className="py-4 sm:px-4 px-2 font-black text-lg text-emerald-500">
                      ${product.price}
                    </td>

                    <td className="py-4 sm:px-4 px-2">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold ${
                          product.paymentOption === "PayFirst"
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-indigo-500/10 text-indigo-500"
                        }`}
                      >
                        <MdPayments /> {product.paymentOption}
                      </div>
                    </td>

                    <td className="py-4 sm:px-4 px-2">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/update-products/${product._id}`
                            )
                          }
                          className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                          title="Update Product"
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          title="Delete Product"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products.length === 0 && (
              <div className="text-center py-20 flex flex-col items-center mx-auto">
                <div className="text-6xl mb-4 mx-auto text-center">
                  <MdInfoOutline></MdInfoOutline>
                </div>
                <p className="text-slate-500 font-bold">
                  No products found in your catalog
                </p>
              </div>
            )}
          </div>
        )}

        {/* Pagination Section */}
        <div
          className={`mt-10 pt-6 border-t flex justify-center ${
            theme === "dark" ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme === "dark" ? "#94a3b8" : "inherit",
                borderRadius: "12px",
                fontWeight: "bold",
                "&.Mui-selected": {
                  background: "linear-gradient(to right, #0ea5e9, #6366f1)",
                  color: "white",
                  "&:hover": { opacity: 0.9 },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerManageProducts;
