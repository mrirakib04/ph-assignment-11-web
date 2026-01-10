import { useContext } from "react";
import MainContext from "../../../Context/MainContext";
import {
  MdTrackChanges,
  MdRocketLaunch,
  MdHandshake,
  MdVerifiedUser,
} from "react-icons/md";

const Mission = () => {
  const { theme } = useContext(MainContext);

  const values = [
    {
      title: "Innovation First",
      desc: "We continuously evolve our tracking algorithms to provide the most accurate real-time data in the industry.",
      icon: <MdRocketLaunch />,
    },
    {
      title: "Absolute Transparency",
      desc: "Our mission is to bridge the gap between production and delivery with 100% visibility for all stakeholders.",
      icon: <MdTrackChanges />,
    },
    {
      title: "Security & Trust",
      desc: "Protecting your business data is our core priority. We build systems that are as secure as they are efficient.",
      icon: <MdVerifiedUser />,
    },
    {
      title: "Partner Success",
      desc: "We don't just provide a tool; we partner with businesses to ensure their operational growth and scalability.",
      icon: <MdHandshake />,
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 ${
        theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Header / Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Our Mission: <br />
              <span className="text-sky-500">Simplify Operations</span>
            </h1>
            <p
              className={`text-lg leading-relaxed ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}
            >
              At NextRun Tracker, our mission is to redefine how businesses
              manage their supply chain. We believe that every production stage
              should be visible, every order should be traceable, and every
              business owner should have full control over their operations
              without the complexity.
            </p>
          </div>

          <div data-aos="zoom-in" className="relative p-10">
            {/* Background Decorative Accents */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>

            <div
              className={`relative z-10 p-10 rounded-3xl border-2 border-dashed ${
                theme === "dark"
                  ? "border-slate-800 bg-slate-900/50"
                  : "border-sky-100 bg-sky-50/50"
              }`}
            >
              <h3 className="text-5xl font-black text-sky-500 mb-2 italic">
                2026
              </h3>
              <p className="font-bold uppercase tracking-widest text-sm">
                Vision Target
              </p>
              <div className="mt-6 h-1 w-20 bg-sky-500 rounded-full"></div>
              <p
                className={`mt-6 italic ${
                  theme === "dark" ? "text-slate-400" : "text-gray-500"
                }`}
              >
                "Empowering 10,000+ businesses to automate their tracking by the
                end of 2026."
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Our Core <span className="text-sky-500">Values</span>
          </h2>
          <div className="w-20 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`group relative p-8 rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 hover:border-sky-500/50 shadow-xl"
                  : "bg-gray-50 border-gray-100 hover:border-sky-500/50 shadow-lg shadow-gray-200"
              }`}
            >
              {/* Animated Corner Accent */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-sky-500/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

              <div className="text-4xl text-sky-500 mb-6 transition-transform duration-300 group-hover:scale-110">
                {value.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{value.title}</h4>
              <p
                className={`text-sm leading-relaxed ${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
