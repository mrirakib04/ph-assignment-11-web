import { useContext, useState } from "react";
import logo from "/mrir_with_bg.jpg";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { ClickAwayListener } from "@mui/material";
import MainContext from "../Context/MainContext";

const Navbar = () => {
  const { user, userImage, handleLogout } = useContext(MainContext);
  const [navShow, setNavShow] = useState(false);
  const navShowHide = () => setNavShow((prev) => !prev);
  const [showProfile, setShowProfile] = useState(false);
  const profileShowHide = () => setShowProfile((prev) => !prev);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setShowProfile(false);
        setNavShow(false);
      }}
    >
      <div className="bg-white/90 w-full fixed z-50 max-w-[1480px] mx-auto">
        <div className="text-black flex justify-between items-center py-2 md:px-6 sm:px-3 px-2 mx-auto shadow-md">
          <div className="relative text-xl flex gap-3 font-bold items-center">
            <div className="flex">
              <button className="lg:hidden text-2xl" onClick={navShowHide}>
                <RiMenu2Fill></RiMenu2Fill>
              </button>
              {navShow && (
                <div className="absolute lg:hidden border-2 text-base rounded-lg top-14 font-bold bg-gray-100 text-gray-700 p-4">
                  <ul className="flex flex-col gap-3 text-nowrap">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "border-green-600 text-green-700 border-2 py-2 px-4 rounded-lg"
                          : "border-2 border-transparent py-2 px-4 rounded-lg"
                      }
                      to="/"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "border-green-600 text-green-700 border-2 py-2 px-4 rounded-lg"
                          : "border-2 border-transparent py-2 px-4 rounded-lg"
                      }
                      to="/products"
                    >
                      Products
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "border-green-600 text-green-700 border-2 py-2 px-4 rounded-lg"
                          : "border-2 border-transparent py-2 px-4 rounded-lg"
                      }
                      to="/about"
                    >
                      About
                    </NavLink>
                    {user && (
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "border-green-600 text-green-700 border-2 py-2 px-4 rounded-lg"
                            : "border-2 border-transparent py-2 px-4 rounded-lg"
                        }
                        to="/dashboard/home"
                      >
                        Dashboard
                      </NavLink>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <Link to={"/"} className="group flex items-center gap-1">
              <img
                className="sm:w-10 w-8 border-b-2 border-l-2 border-black rounded-tl-lg rounded-br-lg group-hover:border-green-700 duration-300 group-hover:scale-105"
                src={logo}
                alt="logo"
              />
              <h1 className="md:text-xl text-lg font-bold sm:block hidden group-hover:text-green-700 duration-300">
                NextRun Tracker
              </h1>
            </Link>
          </div>
          <div className="lg:flex gap-3 font-bold text-base hidden">
            <ul className="flex gap-3">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "py-1 bg-green-300 shadow-lg px-4 rounded-lg border-b-2 border-white"
                    : "py-1 px-4 rounded-lg border-b-2 border-transparent hover:text-green-700 duration-300"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "py-1 bg-green-300 shadow-lg px-4 rounded-lg border-b-2 border-white"
                    : "py-1 px-4 rounded-lg border-b-2 border-transparent hover:text-green-700 duration-300"
                }
                to="/products"
              >
                Products
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "py-1 bg-green-300 shadow-lg px-4 rounded-lg border-b-2 border-white"
                    : "py-1 px-4 rounded-lg border-b-2 border-transparent hover:text-green-700 duration-300"
                }
                to="/about"
              >
                About
              </NavLink>
              {user && (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-1 bg-green-300 shadow-lg px-4 rounded-lg border-b-2 border-white"
                      : "py-1 px-4 rounded-lg border-b-2 border-transparent hover:text-green-700 duration-300"
                  }
                  to="/dashboard/home"
                >
                  Dashboard
                </NavLink>
              )}
            </ul>
          </div>
          {user ? (
            <div className="relative">
              <button onClick={profileShowHide}>
                <img
                  className="h-12 w-12 object-cover rounded-full border-2 border-green-700 cursor-pointer hover:scale-105 duration-300 transition"
                  src={userImage}
                  alt="User-Photo"
                />
              </button>
              {showProfile && (
                <div className="absolute top-16 right-2 flex flex-col gap-2 py-5 px-3 bg-gray-50 rounded-lg border-2">
                  <h3 className="text-lg text-green-700 font-bold">
                    {user.displayName}
                  </h3>
                  <p className="text-lg text-gray-600 font-medium">
                    {user.email}
                  </p>
                  <div>
                    <Link
                      className="text-xl font-semibold hover:text-gray-600 duration-300 hover:scale-105 transition"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-xl font-semibold text-orange-500 hover:text-orange-700 duration-300 hover:scale-105 transition"
                      to="/forgot"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={handleLogout}
                      className="mt-3 text-xl text-left font-bold text-red-600 cursor-pointer hover:text-red-800 duration-300 transition hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3 text-black">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-2 items-center sm:px-5 p-2 bg-green-300 rounded-full text-2xl border border-gray-500"
                    : "flex gap-2 items-center sm:px-5 p-2 bg-white rounded-full text-2xl border border-gray-500"
                }
              >
                <p className="text-lg font-medium sm:block hidden">Login</p>
                <FiLogIn></FiLogIn>
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-2 items-center sm:px-5 p-2 bg-green-300 rounded-full text-2xl border border-gray-500"
                    : "flex gap-2 items-center sm:px-5 p-2 bg-white rounded-full text-2xl border border-gray-500"
                }
              >
                <p className="text-lg font-medium sm:block hidden">Register</p>
                <FaArrowAltCircleUp></FaArrowAltCircleUp>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Navbar;
