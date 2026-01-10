import { useContext } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import MainContext from "../../../Context/MainContext";

const UserTestimonials = () => {
  const { theme } = useContext(MainContext);

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Operations Manager",
      review:
        "The real-time tracking feature has completely transformed how we manage our production line. Highly recommended!",
      rating: 5,
      accent: "bg-blue-500/10",
    },
    {
      name: "Sarah Williams",
      role: "Supply Chain Head",
      review:
        "Clean interface and powerful insights. It's the best tool we've used for order management so far.",
      rating: 5,
      accent: "bg-purple-500/10",
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      review:
        "Efficient and reliable. The manager approval workflow ensures zero errors in our daily operations.",
      rating: 4,
      accent: "bg-emerald-500/10",
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 overflow-hidden ${
        theme === "dark" ? "bg-slate-950" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Title Area - AOS fade-up */}
        <div className="text-center mb-8">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            What Our <span className="text-sky-500">Users Say</span>
          </h2>
          <p
            className={`mt-3 max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Don't just take our word for it. Here is what industry professionals
            think about NextRun Tracker.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className={`relative p-8 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 border hover:-translate-y-2 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 shadow-xl shadow-black/40"
                  : "bg-white border-gray-100 shadow-lg shadow-gray-200"
              }`}
            >
              {/* Corner Accent Color */}
              <div
                className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${item.accent}`}
              ></div>

              {/* Quote Icon */}
              <div
                className={`text-3xl mb-4 ${
                  theme === "dark" ? "text-slate-700" : "text-gray-200"
                }`}
              >
                <FaQuoteLeft />
              </div>

              {/* Review Text */}
              <p
                className={`italic mb-6 z-10 leading-relaxed ${
                  theme === "dark" ? "text-slate-300" : "text-gray-600"
                }`}
              >
                "{item.review}"
              </p>

              {/* Star Rating */}
              <div className="flex gap-1 mb-4 z-10 text-amber-500">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>

              {/* User Info */}
              <div className="mt-auto z-10">
                <h4
                  className={`font-bold text-lg ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.name}
                </h4>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-sky-400" : "text-sky-600"
                  }`}
                >
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
