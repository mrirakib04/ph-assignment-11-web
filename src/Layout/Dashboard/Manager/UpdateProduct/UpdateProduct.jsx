import { useContext } from "react";
import { MenuItem, TextField, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Loader from "../../../../Components/Loader";
import {
  MdEditNote,
  MdAttachMoney,
  MdProductionQuantityLimits,
  MdCloudUpload,
  MdVideoLibrary,
  MdMailOutline,
} from "react-icons/md";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(MainContext);

  // Load product
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    retry: 3,
    queryFn: async () => {
      const res = await axiosPublic.get(`/general/product/${id}`);
      return res.data;
    },
  });

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedProduct = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      moq: Number(form.moq.value),
      images: form.images.value.split(",").map((img) => img.trim()),
      demoVideo: form.demoVideo.value,
      paymentOption: form.paymentOption.value,
      showOnHome: form.showOnHome.value === "true",
      updatedAt: new Date(),
    };

    try {
      await axiosPublic.patch(`/update/product/${id}`, updatedProduct);
      toast.success("Product updated successfully");
      navigate("/dashboard/manage-products"); // Adjusted path to list page
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );

  // MUI Custom styles for Dark Mode consistency
  const muiFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px !important",
      color: theme === "dark" ? "#f8fafc !important" : "inherit !important",
      "& fieldset": {
        borderColor:
          theme === "dark"
            ? "rgba(255, 255, 255, 0.2) !important"
            : "rgba(0, 0, 0, 0.2) !important",
      },
      "&:hover fieldset": {
        borderColor:
          theme === "dark"
            ? "rgba(255, 255, 255, 0.4) !important"
            : "rgba(0, 0, 0, 0.3) !important",
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
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#0ea5e9 !important",
    },
  };

  const inputClass = `w-full transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-800/30 hover:bg-slate-800/50"
      : "bg-slate-50 hover:bg-slate-100"
  }`;

  return (
    <div
      className={`min-h-screen p-4 md:p-10 ${
        theme === "dark" ? "bg-[#020617]" : "bg-slate-50"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto sm:p-6 p-4 md:p-12 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 shadow-2xl ${
          theme === "dark"
            ? "bg-slate-900/80 border-slate-800 shadow-black/50"
            : "bg-white border-slate-200 shadow-slate-200"
        }`}
      >
        {/* Header Area */}
        <div className="text-center mb-10">
          <h1
            className={`sm:text-3xl text-2xl md:text-4xl font-black tracking-tighter mb-3 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Update <span className="text-sky-500">Product</span>
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 opacity-70">
            Product ID: {id}
          </p>
        </div>

        <form onSubmit={handleUpdateProduct} className="space-y-6">
          {/* Section: Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              fullWidth
              label="Product Owner"
              value={product.productOwner}
              className={inputClass}
              sx={muiFieldStyle}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <MdMailOutline className="text-sky-500" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Product Title"
              name="title"
              defaultValue={product.title}
              required
              className={inputClass}
              sx={muiFieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdEditNote className="text-sky-500" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Full Description"
            name="description"
            defaultValue={product.description}
            required
            className={inputClass}
            sx={muiFieldStyle}
          />

          {/* Section: Logistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              defaultValue={product.category}
              className={inputClass}
              sx={muiFieldStyle}
            >
              <MenuItem value="Shirt">Shirt</MenuItem>
              <MenuItem value="Pant">Pant</MenuItem>
              <MenuItem value="Jacket">Jacket</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
            </TextField>

            <TextField
              fullWidth
              type="number"
              label="Price (BDT)"
              name="price"
              defaultValue={product.price}
              className={inputClass}
              sx={muiFieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdAttachMoney className="text-emerald-500" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type="number"
              label="Quantity"
              name="quantity"
              defaultValue={product.quantity}
              className={inputClass}
              sx={muiFieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdProductionQuantityLimits className="text-emerald-500" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Section: Media & Configuration */}
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Images (Comma separated URLs)"
              name="images"
              defaultValue={product.images.join(", ")}
              className={inputClass}
              sx={muiFieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdCloudUpload className="text-indigo-500" />
                  </InputAdornment>
                ),
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="md:col-span-2">
                <TextField
                  fullWidth
                  label="Demo Video URL"
                  name="demoVideo"
                  defaultValue={product.demoVideo || ""}
                  className={inputClass}
                  sx={muiFieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdVideoLibrary className="text-indigo-500" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <TextField
                select
                fullWidth
                label="Payment"
                name="paymentOption"
                defaultValue={product.paymentOption}
                className={inputClass}
                sx={muiFieldStyle}
              >
                <MenuItem value="CashOnDelivery">COD</MenuItem>
                <MenuItem value="PayFirst">Prepaid</MenuItem>
              </TextField>
              <TextField
                select
                fullWidth
                label="Visibility"
                name="showOnHome"
                defaultValue={String(product.showOnHome)}
                className={inputClass}
                sx={muiFieldStyle}
              >
                <MenuItem value="false">Hidden</MenuItem>
                <MenuItem value="true">Home Feed</MenuItem>
              </TextField>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`flex-1 py-3 rounded-2xl font-bold transition-all border ${
                theme === "dark"
                  ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-2 py-3 rounded-2xl font-black text-lg text-white transition-all duration-300 transform hover:-translate-y-1 active:scale-95 bg-linear-to-r from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
