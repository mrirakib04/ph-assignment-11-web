import { Outlet } from "react-router";
import "./App.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function App() {
  return (
    <div className="max-w-[1480px] mx-auto flex flex-col items-center w-full h-full">
      <Outlet></Outlet>
    </div>
  );
}

export default App;
