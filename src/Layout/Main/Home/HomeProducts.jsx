import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Components/Loader";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import MainContext from "../../../Context/MainContext";

const HomeProducts = () => {
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { theme } = useContext(MainContext);

  const { data, isLoading } = useQuery({
    queryKey: ["homeProducts"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/home/products");
      return res.data;
    },
    retry: 2,
  });

  return (
    <section
      className={`w-full py-10 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex flex-col items-center gap-3">
        <div className="w-full">
          {/* Title */}
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-center ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Latest <span className="text-sky-500">Products</span>
          </h2>
          {/* Subtitle */}
          <p
            className={`mt-3 text-center max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Explore our latest featured products selected specially for the home
            page tracking and management.
          </p>
        </div>

        {/* Grid System - 4 columns on large screens */}
        {isLoading ? (
          <Loader />
        ) : data?.products?.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {data?.products?.map((product) => (
              <div
                data-aos="zoom-in"
                key={product._id}
                className={`group border rounded-2xl p-4 transition-all duration-300 hover:-translate-y-2 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 shadow-lg shadow-black/20 hover:border-sky-500/50"
                    : "bg-white border-gray-200 shadow-md hover:shadow-xl hover:border-teal-400"
                }`}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.moq > product.quantity && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                      Out of Stock
                    </div>
                  )}
                </div>

                <h3
                  className={`mt-4 font-bold text-base line-clamp-1 ${
                    theme === "dark" ? "text-slate-100" : "text-gray-800"
                  }`}
                >
                  {product.title}
                </h3>

                <p
                  className={`text-xs line-clamp-2 mt-2 h-8 ${
                    theme === "dark" ? "text-slate-400" : "text-gray-500"
                  }`}
                >
                  {product.description}
                </p>

                <div
                  className={`mt-3 pt-3 border-t text-[13px] ${
                    theme === "dark" ? "border-slate-700" : "border-gray-100"
                  }`}
                >
                  <div className="flex justify-between">
                    <span
                      className={
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      }
                    >
                      Stock:
                    </span>
                    <span
                      className={`font-semibold ${
                        product.quantity < product.moq
                          ? "text-red-400"
                          : "text-green-500"
                      }`}
                    >
                      {product.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span
                      className={
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      }
                    >
                      MOQ:
                    </span>
                    <span
                      className={
                        theme === "dark" ? "text-slate-200" : "text-gray-700"
                      }
                    >
                      {product.moq}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="font-extrabold text-lg text-sky-500">
                    ${product.price}
                  </span>

                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="px-4 py-1.5 cursor-pointer text-sm font-bold rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-colors shadow-md shadow-sky-500/20"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`mt-10 p-10 rounded-xl border-2 border-dashed text-center w-full ${
              theme === "dark"
                ? "border-slate-800 text-slate-500"
                : "border-gray-200 text-gray-400"
            }`}
          >
            <p className="text-lg font-medium">Not enough products to show.</p>
          </div>
        )}

        <Link
          to={"/products"}
          className={`mt-12 px-8 py-3 rounded-xl font-bold ${
            theme === "dark" ? "bg-sky-600" : "bg-slate-900"
          } text-white hover:scale-105 transition-all duration-300 shadow-lg`}
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default HomeProducts;
