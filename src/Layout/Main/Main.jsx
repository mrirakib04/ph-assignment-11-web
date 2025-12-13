import Navbar from "../../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer";

const Main = () => {
  return (
    <div className="w-full">
      <Navbar></Navbar>
      <div className="py-8"></div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
