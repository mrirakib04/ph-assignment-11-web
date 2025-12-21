import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "../App";
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
import DashboardHome from "../Layout/Dashboard/DashboardHome/DashboardHome";
import AdminAllOrders from "../Layout/Dashboard/Admin/AdminAllOrders/AdminAllOrders";
import AdminAllProducts from "../Layout/Dashboard/Admin/AdminAllProducts/AdminAllProducts";
import AdminManageUsers from "../Layout/Dashboard/Admin/AdminManageUsers/AdminManageUsers";
import ManagerAddProduct from "../Layout/Dashboard/Manager/ManagerAddProduct/ManagerAddProduct";
import ManagerManageProducts from "../Layout/Dashboard/Manager/ManagerManageProducts/ManagerManageProducts";
import ManagerPendingOrders from "../Layout/Dashboard/Manager/ManagerPendingOrders/ManagerPendingOrders";
import UpdateProduct from "../Layout/Dashboard/Manager/UpdateProduct/UpdateProduct";
import UserMyOrders from "../Layout/Dashboard/Buyer/UserMyOrders/UserMyOrders";
import UserTrackOrder from "../Layout/Dashboard/Buyer/UserTrackOrder/UserTrackOrder";
import Forgot from "../Layout/Main/Auth/Forgot";
import CheckoutPayment from "../Layout/Main/Payment/CheckoutPayment";
import PaymentSuccess from "../Layout/Main/Payment/PaymentSuccess";
import PaymentFailed from "../Layout/Main/Payment/PaymentFailed";
import ManagerApprovedOrders from "../Layout/Dashboard/Manager/ManagerApprovedOrders/ManagerApprovedOrders";
import IsLogin from "./Security/IsLogin";
import IsAdmin from "./Security/IsAdmin";
import IsAdminManager from "./Security/IsAdminManager";
import IsManager from "./Security/IsManager";
import IsBuyer from "./Security/IsBuyer";
import IsSuspended from "./Security/IsSuspended";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App></App>}>
          <Route path="/" element={<Main></Main>}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/forgot" element={<Forgot></Forgot>}></Route>
            <Route
              path="/products"
              element={<AllProducts></AllProducts>}
            ></Route>
            <Route
              path="/product/:id"
              element={<ProductDetails></ProductDetails>}
            ></Route>
            {/* private */}
            <Route
              path="/booking/:id"
              element={
                <IsLogin>
                  <IsBuyer>
                    <Booking></Booking>
                  </IsBuyer>
                </IsLogin>
              }
            ></Route>
            <Route
              path="/payment"
              element={
                <IsLogin>
                  <IsBuyer>
                    <CheckoutPayment></CheckoutPayment>
                  </IsBuyer>
                </IsLogin>
              }
            ></Route>
            <Route
              path="/payment-success"
              element={
                <IsLogin>
                  <IsBuyer>
                    <PaymentSuccess></PaymentSuccess>
                  </IsBuyer>
                </IsLogin>
              }
            ></Route>
            <Route
              path="/payment-failed"
              element={
                <IsLogin>
                  <IsBuyer>
                    <PaymentFailed></PaymentFailed>
                  </IsBuyer>
                </IsLogin>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <IsLogin>
                  <Profile></Profile>
                </IsLogin>
              }
            ></Route>
            <Route path="/about" element={<About></About>}></Route>
          </Route>
          <Route
            path="/dashboard"
            element={
              <IsLogin>
                <Dashboard></Dashboard>
              </IsLogin>
            }
          >
            <Route
              path="/dashboard"
              element={<Navigate to={"/dashboard/home"}></Navigate>}
            ></Route>
            <Route
              path="/dashboard/home"
              element={<DashboardHome></DashboardHome>}
            ></Route>
            {/* Admin  */}
            <Route
              path="/dashboard/all-orders"
              element={
                <IsAdmin>
                  <IsSuspended>
                    <AdminAllOrders></AdminAllOrders>
                  </IsSuspended>
                </IsAdmin>
              }
            ></Route>
            <Route
              path="/dashboard/all-products"
              element={
                <IsAdmin>
                  <IsSuspended>
                    <AdminAllProducts></AdminAllProducts>
                  </IsSuspended>
                </IsAdmin>
              }
            ></Route>
            <Route
              path="/dashboard/manage-users"
              element={
                <IsAdmin>
                  <IsSuspended>
                    <AdminManageUsers></AdminManageUsers>
                  </IsSuspended>
                </IsAdmin>
              }
            ></Route>
            {/* Manager  */}
            <Route
              path="/dashboard/add-product"
              element={
                <IsAdminManager>
                  <IsSuspended>
                    <ManagerAddProduct></ManagerAddProduct>
                  </IsSuspended>
                </IsAdminManager>
              }
            ></Route>
            <Route
              path="/dashboard/manage-products"
              element={
                <IsManager>
                  <IsSuspended>
                    <ManagerManageProducts></ManagerManageProducts>
                  </IsSuspended>
                </IsManager>
              }
            ></Route>
            <Route
              path="/dashboard/pending-orders"
              element={
                <IsManager>
                  <IsSuspended>
                    <ManagerPendingOrders></ManagerPendingOrders>
                  </IsSuspended>
                </IsManager>
              }
            ></Route>
            <Route
              path="/dashboard/approved-orders"
              element={
                <IsManager>
                  <IsSuspended>
                    <ManagerApprovedOrders></ManagerApprovedOrders>
                  </IsSuspended>
                </IsManager>
              }
            ></Route>
            <Route
              path="/dashboard/update-products/:id"
              element={
                <IsAdminManager>
                  <IsSuspended>
                    <UpdateProduct></UpdateProduct>
                  </IsSuspended>
                </IsAdminManager>
              }
            ></Route>
            {/* Buyer  */}
            <Route
              path="/dashboard/my-orders"
              element={
                <IsBuyer>
                  <IsSuspended>
                    <UserMyOrders></UserMyOrders>
                  </IsSuspended>
                </IsBuyer>
              }
            ></Route>
            <Route
              path="/dashboard/track-order"
              element={
                <IsBuyer>
                  <IsSuspended>
                    <UserTrackOrder></UserTrackOrder>
                  </IsSuspended>
                </IsBuyer>
              }
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
