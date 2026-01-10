import Marquee from "react-fast-marquee";
import { useContext } from "react";
import MainContext from "../../../Context/MainContext";

// Partner logos
import P1 from "./../../../assets/partners/dfc.jpg";
import P2 from "./../../../assets/partners/mrir_with_bg.jpg";
import P3 from "./../../../assets/partners/logo-with-bg.jpg";
import P4 from "./../../../assets/partners/ie_logo.jpg";
import P5 from "./../../../assets/partners/sb4.jpg";
import P6 from "./../../../assets/partners/sb5.jpg";

const OurPartners = () => {
  const { theme } = useContext(MainContext);
  const partners = [P1, P2, P3, P4, P5, P6];

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-linear-to-b from-teal-50 via-white to-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Title Area - Title to content far mb-8 */}
        <div className="text-center mb-8">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Our Trusted <span className="text-sky-500">Partners</span>
          </h2>
          <p
            className={`mt-3 text-base sm:text-lg max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            We collaborate with reliable brands to ensure smooth operations and
            secure tracking.
          </p>
        </div>

        {/* Marquee Container */}
        <div
          className={`w-full border rounded-2xl py-6 transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-800/50 border-slate-700 shadow-xl shadow-black/20"
              : "bg-white border-gray-100 shadow-lg shadow-gray-200"
          }`}
        >
          <Marquee
            speed={70}
            pauseOnHover
            gradient={true}
            gradientColor={"#ffffff"}
            gradientWidth={60}
          >
            {partners.map((logo, index) => (
              <div
                key={index}
                className="mx-8 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="Partner Logo"
                  className={`h-28 sm:h-32 w-auto object-contain rounded-xl p-4 transition-all duration-300 border ${
                    theme === "dark"
                      ? "bg-white border-slate-600 shadow-lg"
                      : "bg-white border-gray-100 shadow-md"
                  }`}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
