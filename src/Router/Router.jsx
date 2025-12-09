import { BrowserRouter, Route, Routes } from "react-router";
import ErrorPage from "./ErrorPage";
import Main from "../Layout/Main/Main";
import Home from "../Layout/Main/Home/Home";
import Login from "../Layout/Main/Auth/Login";
import Register from "../Layout/Main/Auth/Register";
import AllProducts from "../Layout/Main/AllProducts/AllProducts";
import ProductDetails from "../Layout/Main/ProductDetails/ProductDetails";
import Booking from "../Layout/Main/Booking/Booking";
import Profile from "../Layout/Main/Profile/Profile";
import About from "../Layout/Main/About/About";
import Dashboard from "../Layout/Dashboard/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App></App>}>
          <Route path="/" element={<Main></Main>}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route
              path="/products"
              element={<AllProducts></AllProducts>}
            ></Route>
            <Route
              path="/product/:id"
              element={<ProductDetails></ProductDetails>}
            ></Route>
            <Route path="/booking/:id" element={<Booking></Booking>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/about" element={<About></About>}></Route>
          </Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
