import { Box, Typography, Button, Chip, Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MainContext from "../../../Context/MainContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Components/Loader";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { HeadProvider, Title } from "react-head";
import {
  MdVerified,
  MdSecurity,
  MdPayment,
  MdVideoLibrary,
  MdDescription,
} from "react-icons/md";
import { FaInfo } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const AxiosPublic = useAxiosPublic();
  const { user, theme } = useContext(MainContext);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { data: product, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    enabled: !!id,
    retry: 1,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/general/product/${id}`);
      return res.data;
    },
  });

  const { data: userData } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    retry: 2,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (!product?._id)
    return (
      <div className="h-screen flex items-center justify-center">
        <Typography color="error" variant="h5">
          Product not found
        </Typography>
      </div>
    );

  const isOrderAllowed =
    user &&
    userData?.role !== "Admin" &&
    userData?.role !== "Manager" &&
    userData?.status !== "suspended";

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 overflow-hidden ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>Product Details || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-7xl mx-auto px-5">
        {/* Upper Section: Images and Primary Info */}
        <div
          className={`relative flex flex-col lg:flex-row gap-12 p-6 md:p-10 rounded-3xl border transition-all duration-300 mb-10 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/50"
              : "bg-white border-gray-100 shadow-xl shadow-gray-200"
          }`}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl"></div>

          {/* Left: Swiper & Video */}
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="rounded-2xl overflow-hidden shadow-lg border border-slate-700/20"
            >
              {product.images?.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`product-${i}`}
                    className="w-full h-[220px] sm:h-[300px] md:h-[450px] object-contain bg-slate-50/5"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mt-4"
            >
              {product.images?.map((img, i) => (
                <SwiperSlide key={i} className="cursor-pointer">
                  <div
                    className={`rounded-xl overflow-hidden border-2 transition-all ${
                      theme === "dark" ? "border-slate-800" : "border-gray-200"
                    } hover:border-sky-500`}
                  >
                    <img
                      src={img}
                      alt="thumb"
                      className="w-full sm:h-20 h-16 object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right: Primary Info */}
          <div className="w-full lg:w-1/2 flex flex-col" data-aos="fade-left">
            <div className="flex justify-between items-start mb-4">
              <Chip
                label={product.category}
                className="bg-sky-500/10! text-sky-500! font-bold border-none"
              />
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                <MdVerified /> Manager Verified
              </div>
            </div>

            <h1 className="lg:text-2xl text-xl font-black mb-6 leading-tight uppercase">
              {product.title}
            </h1>

            <div
              className={`p-6 rounded-2xl mb-8 flex flex-wrap gap-8 border ${
                theme === "dark"
                  ? "bg-slate-950/50 border-slate-800"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-1">
                  Unit Price
                </p>
                <h2 className="md:text-4xl sm:text-3xl text-2xl font-black text-sky-500">
                  ${product.price}
                </h2>
              </div>
              <Divider
                orientation="vertical"
                flexItem
                className={theme === "dark" ? "bg-slate-800" : "bg-gray-200"}
              />
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-1">
                  Stock Availability
                </p>
                <h2 className="sm:text-2xl text-xl font-bold">
                  {product.quantity} Units
                </h2>
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-1">
                  Minimum Order
                </p>
                <h2 className="sm:text-2xl text-xl font-bold">
                  {product.moq} Units
                </h2>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="font-black text-sm uppercase tracking-widest opacity-60">
                Security & Compliance
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-800/50 bg-slate-500/5">
                  <MdSecurity className="text-2xl text-sky-500" />
                  <span className="text-sm font-bold uppercase tracking-wide">
                    Secure Booking
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-800/50 bg-slate-500/5">
                  <MdPayment className="text-2xl text-emerald-500" />
                  <span className="text-sm font-bold uppercase tracking-wide">
                    {product.paymentOption}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <button
                disabled={!isOrderAllowed}
                onClick={() => navigate(`/booking/${product._id}`)}
                className={`w-full py-5 rounded-2xl font-black sm:text-xl text-lg shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                  isOrderAllowed
                    ? "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/30"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                }`}
              >
                Order / Book Now
              </button>

              {!isOrderAllowed && (
                <p className="mt-4 text-center text-sm font-bold text-rose-500 animate-pulse flex items-center justify-center gap-2">
                  <FaInfo /> Only active buyers are authorized to place orders.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Lower Section: Detailed Description & Video */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Description */}
          <div
            className={`lg:col-span-2 p-8 rounded-3xl border ${
              theme === "dark"
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-gray-100 shadow-lg"
            }`}
            data-aos="fade-up"
          >
            <div className="flex items-center gap-2 mb-6 text-sky-500">
              <MdDescription className="text-3xl" />
              <h2 className="lg:text-2xl md:text-xl text-lg font-black uppercase tracking-tight">
                Detailed Description
              </h2>
            </div>
            <p
              className={`sm:text-lg text-base leading-relaxed whitespace-pre-line ${
                theme === "dark" ? "text-slate-400" : "text-gray-700"
              }`}
            >
              {product.description}
            </p>
          </div>

          {/* Video / Secondary Info */}
          <div
            className="lg:col-span-1 space-y-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {product.demoVideo ? (
              <div
                className={`p-6 rounded-3xl border ${
                  theme === "dark"
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-gray-100 shadow-lg"
                }`}
              >
                <div className="flex items-center gap-2 mb-4 text-sky-500">
                  <MdVideoLibrary className="text-2xl" />
                  <h3 className="font-black uppercase tracking-widest text-sm">
                    Product Demo
                  </h3>
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src={product.demoVideo}
                    title="Demo"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <div
                className={`p-10 rounded-3xl border border-dashed text-center ${
                  theme === "dark" ? "border-slate-800" : "border-gray-200"
                }`}
              >
                <p className="text-slate-500 font-bold">
                  No Demo Video Available
                </p>
              </div>
            )}

            <div
              className={`sm:p-8 p-4 rounded-3xl bg-sky-500 text-white shadow-xl shadow-sky-500/20`}
            >
              <h4 className="font-black mb-2 uppercase tracking-tight text-xl text-center">
                Need Custom Help?
              </h4>
              <p className="text-sm text-sky-50 text-center opacity-90 mb-4">
                Contact our managers for bulk pricing and custom logistics.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="w-full py-3 bg-white text-sky-500 font-black rounded-xl hover:bg-sky-100 transition-colors uppercase text-sm shadow-lg"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
