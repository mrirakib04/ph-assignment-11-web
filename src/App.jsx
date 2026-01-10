import { Outlet } from "react-router";
import "./App.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useContext, useEffect } from "react";
import MainContext from "./Context/MainContext";
import "aos/dist/aos.css";
import Aos from "aos";

function App() {
  const { theme } = useContext(MainContext);
  useEffect(() => {
    Aos.init();
  }, []);

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
