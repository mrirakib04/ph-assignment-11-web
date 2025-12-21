import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Components/Loader";
import { Link, useNavigate } from "react-router";

const HomeProducts = () => {
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["homeProducts"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/home/products");
      return res.data;
    },
    retry: 2,
  });

  console.log(data);

  return (
    <section className="max-w-[1200px] mx-auto px-5 py-16 w-full flex flex-col items-center gap-3">
      <div className="w-full">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Latest Products
        </h2>
        {/* Subtitle */}
        <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
          Explore our latest featured products selected specially for the home
          page.
        </p>
      </div>

      {/* Grid */}
      {isLoading ? (
        <Loader></Loader>
      ) : data?.products.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {data?.products?.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-4 shadow-md hover:shadow-lg transition border-teal-400 shadow-teal-400"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />

              <h3 className="mt-3 font-semibold text-lg line-clamp-1">
                {product.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {product.description}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                <span className="font-medium">Quantity:</span>{" "}
                {product.quantity}{" "}
                {product.moq < product.quantity && (
                  <span className="text-orange-700 font-semibold">
                    - Not Available
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                <span className="font-medium">Minimum Order Quantity:</span>{" "}
                {product.moq}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <span className="font-bold text-teal-600">
                  $ {product.price}
                </span>

                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="px-5 cursor-pointer font-medium py-1.5 rounded-md bg-linear-to-br from-teal-700 to-teal-500 hover:to-green-700 text-white transition"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-orange-600 text-center font-medium py-10">
          Not enough products to show. Quantity is less than 3!
        </p>
      )}

      <Link
        to={"/products"}
        className="px-4 py-2 rounded-md bg-linear-to-br from-black to-gray-900 hover:to-gray-700 hover:scale-[1.02] transition duration-300 hover:shadow-md text-white mx-auto w-fit mt-10 content-center"
      >
        View All Products
      </Link>
    </section>
  );
};

export default HomeProducts;
