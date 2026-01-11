import { useContext, useState } from "react";
import logo from "/mrir_with_bg.jpg";
import { FaArrowAltCircleUp } from "react-icons/fa";
import {
  FiLogIn,
  FiMoon,
  FiSun,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { ClickAwayListener } from "@mui/material";
import MainContext from "../Context/MainContext";

const Navbar = () => {
  const { user, userImage, handleLogout, theme, toggleTheme } =
    useContext(MainContext);
  const [navShow, setNavShow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Active Style based on Sky/Green Theme
  const activeStyle = `border-sky-500 ${
    theme === "dark" ? "text-sky-400 bg-sky-900/20" : "text-sky-600 bg-sky-50"
  } border-b-2 py-1 px-4 rounded-lg font-bold transition-all duration-300`;
  const normalStyle = `border-b-2 border-transparent py-1 px-4 rounded-lg hover:text-sky-500 duration-300 ${
    theme === "dark" ? "text-gray-300" : "text-gray-600"
  }`;

  return (
    <nav
      className={`fixed max-w-[1480px] mx-auto w-full z-50 transition-all duration-300 border-b ${
        theme === "dark"
          ? "bg-slate-900/80 text-white border-slate-800 shadow-sky-900/20"
          : "bg-white/80 text-black border-gray-200"
      } backdrop-blur-md shadow-md px-4`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Left Section: Logo & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <ClickAwayListener
              onClickAway={() => {
                setNavShow(false);
              }}
            >
              <div>
                <button
                  className={`lg:hidden text-2xl focus:outline-none hover:text-sky-500 transition-colors ${
                    theme === "dark" ? "text-white" : "text-gray-600"
                  }`}
                  onClick={() => setNavShow(!navShow)}
                >
                  <RiMenu2Fill />
                </button>
                {/* Mobile Sidebar */}
                {navShow && (
                  <div
                    className={`lg:hidden absolute top-16 left-4 w-72 border rounded-2xl shadow-2xl p-4 animate-in slide-in-from-left-5 ${
                      theme === "dark"
                        ? "bg-slate-900 border-slate-800"
                        : "bg-white border-gray-100"
                    }`}
                  >
                    <ul className="flex flex-col gap-2">
                      <NavLink
                        to="/"
                        onClick={() => setNavShow(false)}
                        className={({ isActive }) =>
                          isActive ? activeStyle : normalStyle
                        }
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to="/products"
                        onClick={() => setNavShow(false)}
                        className={({ isActive }) =>
                          isActive ? activeStyle : normalStyle
                        }
                      >
                        Products
                      </NavLink>
                      <NavLink
                        to="/about"
                        onClick={() => setNavShow(false)}
                        className={({ isActive }) =>
                          isActive ? activeStyle : normalStyle
                        }
                      >
                        About Us
                      </NavLink>
                      <NavLink
                        to="/career"
                        onClick={() => setNavShow(false)}
                        className={({ isActive }) =>
                          isActive ? activeStyle : normalStyle
                        }
                      >
                        Career
                      </NavLink>
                      {user && (
                        <NavLink
                          to="/dashboard/home"
                          onClick={() => setNavShow(false)}
                          className={({ isActive }) =>
                            isActive ? activeStyle : normalStyle
                          }
                        >
                          Dashboard
                        </NavLink>
                      )}

                      {!user && (
                        <div
                          className={`mt-4 pt-4 border-t flex flex-col gap-3 ${
                            theme === "dark"
                              ? "border-slate-800"
                              : "border-gray-100"
                          }`}
                        >
                          <Link
                            to="/login"
                            onClick={() => setNavShow(false)}
                            className="text-center py-2 text-sky-600 dark:text-sky-400 font-bold"
                          >
                            Login
                          </Link>
                          <Link
                            to="/register"
                            onClick={() => setNavShow(false)}
                            className="text-center py-2 bg-green-500 text-white rounded-lg font-bold shadow-md"
                          >
                            Register
                          </Link>
                        </div>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </ClickAwayListener>
            <Link to="/" className="flex items-center gap-2 group">
              <img
                className="w-9 h-9 border-2 border-sky-500 rounded-lg group-hover:rotate-6 transition-transform duration-300"
                src={logo}
                alt="logo"
              />
              <span className="hidden sm:block text-xl font-extrabold bg-linear-to-r from-sky-600 to-green-600 bg-clip-text text-transparent">
                NextRun Tracker
              </span>
            </Link>
          </div>

          {/* Center Section: Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeStyle : normalStyle
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? activeStyle : normalStyle
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? activeStyle : normalStyle
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/career"
              className={({ isActive }) =>
                isActive ? activeStyle : normalStyle
              }
            >
              Career
            </NavLink>
            {user && (
              <NavLink
                to="/dashboard/home"
                className={({ isActive }) =>
                  isActive ? activeStyle : normalStyle
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border transition-all duration-300 hover:scale-110 ${
                theme === "dark"
                  ? "bg-slate-800 border-sky-500 text-yellow-400"
                  : "bg-gray-100 border-gray-300 text-sky-600"
              }`}
            >
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>

            {user ? (
              <ClickAwayListener
                onClickAway={() => {
                  setShowProfile(false);
                }}
              >
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center focus:outline-none"
                  >
                    <img
                      className="h-10 w-10 object-cover rounded-full border-2 border-sky-500 hover:border-green-500 transition-all duration-300 shadow-sm"
                      src={userImage || "https://i.ibb.co/mR79Y6q/user.png"}
                      alt="Profile"
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {showProfile && (
                    <div
                      className={`absolute top-14 right-0 w-64 border rounded-xl shadow-2xl py-3 animate-in fade-in slide-in-from-top-2 ${
                        theme === "dark"
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-gray-100 text-slate-800"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 border-b mb-2 ${
                          theme === "dark"
                            ? "border-slate-700"
                            : "border-gray-100"
                        }`}
                      >
                        <p className="font-bold text-sky-500 truncate">
                          {user?.displayName}
                        </p>
                        <p className="text-xs opacity-70 truncate">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        className={`flex items-center gap-3 px-4 py-2 transition-colors ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-sky-900/20"
                            : "text-gray-600 hover:bg-sky-50"
                        }`}
                      >
                        <FiUser /> Profile
                      </Link>
                      <Link
                        to="/forgot"
                        className={`flex items-center gap-3 px-4 py-2 transition-colors ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-sky-900/20"
                            : "text-gray-600 hover:bg-sky-50"
                        }`}
                      >
                        <FiSettings /> Forgot Password?
                      </Link>

                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-2 mt-2 text-red-500 ${
                          theme === "dark"
                            ? "hover:bg-red-50"
                            : "hover:bg-red-900/10"
                        } font-bold transition-all`}
                      >
                        <FiLogOut /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border font-bold transition-all ${
                    theme === "dark"
                      ? "border-sky-500 text-sky-400 hover:bg-sky-900/20"
                      : "border-sky-500 text-sky-600 hover:bg-sky-50"
                  }`}
                >
                  Login <FiLogIn />
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-bold bg-sky-500 hover:bg-sky-600 text-white transition-all shadow-lg shadow-sky-200 dark:shadow-none"
                >
                  Join <FaArrowAltCircleUp />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
