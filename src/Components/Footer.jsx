import { useContext } from "react";
import { FaInstagram, FaYoutube, FaFacebook, FaEnvelope } from "react-icons/fa";
import MainContext from "../Context/MainContext";
import { Link } from "react-router";

const Footer = () => {
  const { theme } = useContext(MainContext);

  return (
    <footer
      className={`w-full py-16 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-linear-to-br from-slate-950 via-black to-teal-950 text-white"
          : "bg-gray-50 text-gray-900 border-t border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Main Content Grid */}
        <div
          className={`flex flex-wrap justify-between items-start gap-10 pb-10 border-b ${
            theme === "dark" ? "border-slate-800" : "border-gray-200"
          }`}
        >
          {/* Brand Section */}
          <div className="flex flex-col items-start gap-4 min-w-[280px]">
            <h4 className="bg-linear-to-br from-teal-300 to-sky-400 bg-clip-text font-serif text-transparent font-black italic text-3xl">
              NextRun Tracker
            </h4>
            <p
              className={`max-w-xs font-medium leading-relaxed ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}
            >
              An all-in-one SaaS platform for managing orders, production
              stages, payments, and delivery tracking with full visibility.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-col items-start gap-4">
            <h5 className="font-bold text-lg tracking-tight">Company</h5>
            <ul
              className={`font-medium flex flex-col gap-2 ${
                theme === "dark" ? "text-slate-500" : "text-gray-500"
              }`}
            >
              <li>
                <Link
                  to={"/about"}
                  className="hover:text-sky-500 transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to={"/career"}
                  className="hover:text-sky-500 transition duration-300"
                >
                  Join Us
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="hover:text-sky-500 transition duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div className="flex flex-col items-start gap-4">
            <h5 className="font-bold text-lg tracking-tight">Information</h5>
            <ul
              className={`font-medium flex flex-col gap-2 ${
                theme === "dark" ? "text-slate-500" : "text-gray-500"
              }`}
            >
              <li>
                <Link
                  to={"/mission"}
                  className="hover:text-sky-500 transition duration-300"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  to={"/policy"}
                  className="hover:text-sky-500 transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to={"/terms"}
                  className="hover:text-sky-500 transition duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col items-start gap-4">
            <h5 className="font-bold text-lg tracking-tight">Get in Touch</h5>
            <ul
              className={`font-medium flex flex-col gap-3 ${
                theme === "dark" ? "text-slate-500" : "text-gray-500"
              }`}
            >
              <li>
                <a
                  href="#"
                  className="hover:text-sky-500 transition duration-300 flex items-center gap-2"
                >
                  <FaInstagram className="text-pink-500" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-sky-500 transition duration-300 flex items-center gap-2"
                >
                  <FaYoutube className="text-red-500" /> Youtube
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/NextRun1/"
                  target="_blank"
                  className="hover:text-sky-500 transition duration-300 flex items-center gap-2"
                >
                  <FaFacebook className="text-blue-500" /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@NextRunTracker.com"
                  className="hover:text-sky-500 transition duration-300 flex items-center gap-2"
                >
                  <FaEnvelope className="text-sky-500" />{" "}
                  support@NextRunTracker.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
          <p
            className={`font-medium text-sm ${
              theme === "dark" ? "text-slate-500" : "text-gray-500"
            }`}
          >
            © {new Date().getFullYear()} NextRun Tracker. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-sky-500/50">
            <span>Security</span>
            <span>Speed</span>
            <span>Reliability</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
