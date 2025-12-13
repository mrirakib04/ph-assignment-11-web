import Sidebar from "../../Components/Sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 h-screen w-full">
      <div className="col-span-2">
        <Sidebar></Sidebar>
      </div>

      <div className="col-span-10 overflow-y-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
