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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const AxiosPublic = useAxiosPublic();
  const { user } = useContext(MainContext);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Product
  const { data: product, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    enabled: !!id,
    retry: 1,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/general/product/${id}`);
      return res.data;
    },
  });

  // User role
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
    return <Typography color="error">Product not found</Typography>;

  const isOrderAllowed =
    user &&
    userData?.role !== "Admin" &&
    userData?.role !== "Manager" &&
    userData?.status !== "suspended";

  return (
    <Box className="px-5 py-10 flex justify-center">
      <Box className="max-w-6xl w-full flex flex-col md:flex-row gap-10 border rounded-lg shadow-lg p-5 bg-white">
        {/* Slider */}
        <Box className="w-full md:w-1/2">
          <Swiper
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="rounded-lg"
          >
            {product.images?.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`product-${i}`}
                  className="w-full lg:h-80 md:h-60 h-40 object-contain rounded-lg bg-gray-100"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Navigation, Thumbs]}
            className="mt-3"
          >
            {product.images?.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`thumb-${i}`}
                  className="w-full lg:h-20 h-12 object-cover rounded border cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {product.demoVideo && (
            <Box mt={3}>
              <iframe
                src={product.demoVideo}
                title="Demo Video"
                className="w-full h-56 rounded"
                allowFullScreen
              />
            </Box>
          )}
        </Box>

        {/* Info */}
        <Box className="w-full md:w-1/2 flex flex-col gap-3">
          <Typography variant="h5" fontWeight="bold">
            {product.title}
          </Typography>

          <Typography color="text.secondary">{product.description}</Typography>

          <Divider />

          <Box className="flex gap-2 flex-wrap">
            <Chip label={product.category} />
            <Chip label={product.paymentOption} color="success" />
          </Box>

          <Typography variant="h6">Price: ${product.price}</Typography>
          <Typography>Available Quantity: {product.quantity}</Typography>
          <Typography>Minimum Order: {product.moq}</Typography>

          <Divider />

          <Typography fontWeight="bold">Our Supports</Typography>
          <ul className="list-disc ml-5 text-sm text-gray-600">
            <li>Secure booking system</li>
            <li>Flexible payment options</li>
            <li>Manager-verified products</li>
          </ul>

          <Button
            variant="contained"
            size="large"
            disabled={!isOrderAllowed}
            onClick={() => navigate(`/booking/${product._id}`)}
            sx={{ mt: 2 }}
          >
            Order / Book Now
          </Button>

          {!isOrderAllowed && (
            <Typography fontSize={13} color="error">
              Only active buyers can place orders
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
