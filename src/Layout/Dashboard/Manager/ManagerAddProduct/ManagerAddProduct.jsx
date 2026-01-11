import { useContext } from "react";
import { MenuItem, TextField, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import MainContext from "../../../../Context/MainContext";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {
  MdProductionQuantityLimits,
  MdCloudUpload,
  MdVideoLibrary,
  MdAttachMoney,
  MdCategory,
  MdShoppingCart,
  MdOutlineDescription,
  MdMailOutline,
} from "react-icons/md";

const ManagerAddProduct = () => {
  const { user, theme } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();

  const { data: userData } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;

    const product = {
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
      productOwner:
        (userData?.role === "Admin" && user?.email) ||
        (userData?.role === "Manager" && userData?.managerFor),
    };

    try {
      const res = await AxiosPublic.post("/products", product);
      if (res.data.insertedId) {
        toast.success("Product listed successfully!");
        form.reset();
      }
    } catch (error) {
      toast.error("Process failed. Try again.");
    }
  };

  const productOwner =
    (userData?.role === "Admin" && user?.email) ||
    (userData?.role === "Manager" && userData?.managerFor) ||
    "";

  // Common Class for Inputs
  const inputClass = `w-full rounded-2xl transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-800/50 hover:bg-slate-800"
      : "bg-slate-50 hover:bg-slate-100"
  }`;

  return (
    <div
      className={`min-h-screen p-4 md:p-10 ${
        theme === "dark" ? "bg-[#020617]" : "bg-slate-50"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto sm:p-6 p-3 md:p-12 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 shadow-2xl ${
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
            Add New <span className="text-sky-500">Product</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500 opacity-70">
            Digital Asset Management Portal
          </p>
        </div>

        <form onSubmit={handleAddProduct} className="space-y-8">
          {/* Section 1: Core Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-6 bg-sky-500 rounded-full"></div>
              <h2 className="text-sky-500 font-black uppercase text-xs tracking-widest">
                General Information
              </h2>
            </div>

            <TextField
              fullWidth
              label="Product Owner"
              value={productOwner}
              className={inputClass}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <MdMailOutline className="text-sky-500" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "16px",
                  color: theme === "dark" ? "white" : "inherit",
                },
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <TextField
                fullWidth
                label="Product Title"
                name="title"
                required
                className={inputClass}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdShoppingCart className="text-sky-500" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "16px",
                    color: theme === "dark" ? "white" : "inherit",
                  },
                }}
              />
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                defaultValue="Accessories"
                required
                className={inputClass}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdCategory className="text-sky-500" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "16px",
                    color: theme === "dark" ? "white" : "inherit",
                  },
                }}
              >
                <MenuItem value="Shirt">Shirt</MenuItem>
                <MenuItem value="Pant">Pant</MenuItem>
                <MenuItem value="Jacket">Jacket</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
              </TextField>
            </div>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Full Description"
              name="description"
              required
              className={inputClass}
              InputProps={{
                sx: {
                  borderRadius: "16px",
                  color: theme === "dark" ? "white" : "inherit",
                },
              }}
            />
          </div>

          {/* Section 2: Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              <h2 className="text-emerald-500 font-black uppercase text-xs tracking-widest">
                Pricing & Inventory
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextField
                fullWidth
                type="number"
                label="Price (BDT)"
                name="price"
                required
                className={inputClass}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdAttachMoney className="text-emerald-500" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "16px",
                    color: theme === "dark" ? "white" : "inherit",
                  },
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                name="quantity"
                required
                className={inputClass}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdProductionQuantityLimits className="text-emerald-500" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "16px",
                    color: theme === "dark" ? "white" : "inherit",
                  },
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="MOQ"
                name="moq"
                required
                className={inputClass}
                InputProps={{
                  sx: {
                    borderRadius: "16px",
                    color: theme === "dark" ? "white" : "inherit",
                  },
                }}
              />
            </div>
          </div>

          {/* Section 3: Media */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
              <h2 className="text-indigo-500 font-black uppercase text-xs tracking-widest">
                Media & Visibility
              </h2>
            </div>

            <TextField
              fullWidth
              label="Image Gallery URLs (Comma Separated)"
              name="images"
              required
              className={inputClass}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdCloudUpload className="text-indigo-500" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "16px",
                  color: theme === "dark" ? "white" : "inherit",
                },
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="md:col-span-1">
                <TextField
                  fullWidth
                  label="Demo Video URL"
                  name="demoVideo"
                  className={inputClass}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdVideoLibrary className="text-indigo-500" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "16px",
                      color: theme === "dark" ? "white" : "inherit",
                    },
                  }}
                />
              </div>
              <TextField
                select
                fullWidth
                label="Payment"
                name="paymentOption"
                defaultValue="PayFirst"
                required
                className={inputClass}
                InputProps={{ sx: { borderRadius: "16px" } }}
              >
                <MenuItem value="CashOnDelivery">COD</MenuItem>
                <MenuItem value="PayFirst">Prepaid</MenuItem>
              </TextField>
              <TextField
                select
                fullWidth
                label="Show on Home"
                name="showOnHome"
                defaultValue="false"
                className={inputClass}
                InputProps={{ sx: { borderRadius: "16px" } }}
              >
                <MenuItem value="false">Hidden</MenuItem>
                <MenuItem value="true">Visible</MenuItem>
              </TextField>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-black text-lg text-white transition-all duration-300 transform hover:-translate-y-1 active:scale-95 bg-linear-to-r from-sky-500 via-indigo-500 to-purple-600 shadow-md shadow-sky-400/40 hover:shadow-sky-500/70 hover:shadow-lg"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagerAddProduct;
