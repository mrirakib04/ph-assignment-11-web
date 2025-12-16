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
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import Loader from "../../../Components/Loader";

const AllProducts = () => {
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["allProducts", category, search, sort],
    queryFn: async () => {
      const res = await AxiosPublic.get("/general/page/products", {
        params: { category, search, sort },
      });
      return res.data;
    },
    retry: 1,
  });
  console.log(products);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        All Products
      </Typography>

      {/* Filters */}
      <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mb-10">
        <TextField
          fullWidth
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="col-span-1"
        >
          <MenuItem value="">All</MenuItem>
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
          onChange={(e) => setSort(e.target.value)}
          className="col-span-1"
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="price_asc">Low to High</MenuItem>
          <MenuItem value="price_desc">High to Low</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Search"
          placeholder="Search by product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:col-span-1 sm:col-span-2 col-span-1"
        />
      </div>

      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {products.map((product) => (
            <Grid
              key={product._id}
              className="shadow-md shadow-gray-400 hover:shadow-lg duration-300"
            >
              <Card>
                <CardMedia
                  component="img"
                  image={product?.images[0]}
                  alt={product.title}
                  className="h-40 shadow"
                />

                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {product.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>

                  <Typography mt={1}>Price: ৳{product.price}</Typography>

                  <Typography variant="body2">
                    Available: {product.quantity}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </div>
      )}
      {/* Products Grid */}
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {products.map((product) => (
          <Grid key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
              />

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {product.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>

                <Typography mt={1}>Price: ৳{product.price}</Typography>

                <Typography variant="body2">
                  Available: {product.quantity}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </div>
    </Box>
  );
};

export default AllProducts;
