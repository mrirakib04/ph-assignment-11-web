import { TiInfo } from "react-icons/ti";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="py-20 flex flex-col items-center gap-5 justify-center">
      <TiInfo className="text-5xl text-red-800"></TiInfo>
      <p className="text-xl font-semibold text-red-500">Page Not Found!</p>
      <Link
        className="py-1 px-6 rounded-lg bg-green-600 hover:bg-green-800 duration-300 transition font-medium text-white text-lg mt-2"
        to={"/"}
      >
        Go back!
      </Link>
    </div>
  );
};

export default ErrorPage;
