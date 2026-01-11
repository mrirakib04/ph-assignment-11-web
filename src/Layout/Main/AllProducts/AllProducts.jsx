import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  MenuItem,
  Box,
  Pagination,
  Chip,
} from "@mui/material";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import Loader from "../../../Components/Loader";
import { HeadProvider, Title } from "react-head";
import MainContext from "../../../Context/MainContext";
import { MdSearch, MdFilterList, MdArrowForward } from "react-icons/md";

const AllProducts = () => {
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { theme } = useContext(MainContext);

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["allProducts", category, search, sort, page],
    queryFn: async () => {
      const res = await AxiosPublic.get("/general/page/products", {
        params: { category, search, sort, page },
      });
      return res.data;
    },
    retry: 1,
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  // Custom styling for inputs based on theme
  const filterStyle = {
    "& .MuiOutlinedInput-root": {
      color: theme === "dark" ? "white" : "inherit",
      "& fieldset": { borderColor: theme === "dark" ? "#334155" : "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#0ea5e9" },
      borderRadius: "12px",
      bgcolor: theme === "dark" ? "#0f172a" : "white",
    },
    "& .MuiInputLabel-root": {
      color: theme === "dark" ? "#94a3b8" : "#64748b",
    },
  };

  return (
    <section
      className={`min-h-screen py-10 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>Our Collection || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-7xl mx-auto px-5">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Explore <span className="text-sky-500">Collection</span>
            </h1>
            <p className="text-sm font-bold opacity-60 uppercase tracking-widest mt-1">
              Premium Gear for your Next Run
            </p>
          </div>
          <Chip
            label={`${products.length} Products Found`}
            variant="outlined"
            sx={{
              color: "#0ea5e9",
              borderColor: "#0ea5e9",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Filters Panel */}
        <div
          className={`p-6 rounded-3xl border mb-10 transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <TextField
              fullWidth
              select
              label="Category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              sx={filterStyle}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Shirt">Shirt</MenuItem>
              <MenuItem value="Pant">Pant</MenuItem>
              <MenuItem value="Jacket">Jacket</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
            </TextField>

            <TextField
              fullWidth
              select
              label="Sort by Price"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              sx={filterStyle}
            >
              <MenuItem value="">Default Sorting</MenuItem>
              <MenuItem value="price_asc">Price: Low to High</MenuItem>
              <MenuItem value="price_desc">Price: High to Low</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Search Product"
              placeholder="Type name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              sx={{ ...filterStyle, md: { gridColumn: "span 2" } }}
              InputProps={{
                endAdornment: <MdSearch className="text-2xl opacity-40" />,
              }}
            />

            <Button
              variant="contained"
              onClick={() => {
                setSearch("");
                setCategory("");
                setSort("");
                setPage(1);
              }}
              className="md:col-span-1 h-14 rounded-xl font-black"
              sx={{
                bgcolor: theme === "dark" ? "#1e293b" : "#f1f5f9",
                color: theme === "dark" ? "white" : "black",
                "&:hover": { bgcolor: "#ef4444", color: "white" },
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="h-60 flex items-center justify-center">
            <Loader />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Typography variant="h6" opacity={0.5}>
              No products found matching your criteria.
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                data-aos="zoom-in"
                className={`group relative rounded-4xl border overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  theme === "dark"
                    ? "bg-slate-900 border-slate-800 hover:shadow-sky-500/10 shadow-2xl"
                    : "bg-white border-gray-100 shadow-xl hover:shadow-2xl"
                }`}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product?.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Chip
                      label={product.category}
                      size="small"
                      className="font-black uppercase text-[10px]! tracking-widest bg-white/90! backdrop-blur! text-slate-900!"
                    />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="bg-white text-slate-900 px-6 py-2 rounded-full font-black uppercase text-xs tracking-tighter shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-black truncate mb-1 uppercase tracking-tighter">
                    {product.title}
                  </h3>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-sky-500">
                      ৳{product.price}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                        product.quantity > 0
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-rose-500/10 text-rose-500"
                      }`}
                    >
                      {product.quantity > 0
                        ? `${product.quantity} IN STOCK`
                        : "OUT OF STOCK"}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className={`w-full py-3 rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all ${
                      theme === "dark"
                        ? "bg-slate-800 hover:bg-sky-500 text-white"
                        : "bg-gray-100 hover:bg-sky-500 hover:text-white text-slate-900"
                    }`}
                  >
                    Details <MdArrowForward className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-20">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => {
              setPage(value);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme === "dark" ? "white" : "inherit",
                fontWeight: "bold",
                borderRadius: "12px",
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
