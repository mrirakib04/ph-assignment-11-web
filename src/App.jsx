import { Outlet } from "react-router";
import "./App.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useContext } from "react";
import MainContext from "./Context/MainContext";

function App() {
  const { theme } = useContext(MainContext);

  return (
    <div
      className={`max-w-[1480px] mx-auto flex flex-col items-center w-full h-full ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-white/80 text-black"
      }`}
    >
      <Outlet></Outlet>
    </div>
  );
}

export default App;
