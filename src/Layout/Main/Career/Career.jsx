import { useContext } from "react";
import MainContext from "../../../Context/MainContext";
import {
  MdEmail,
  MdWorkOutline,
  MdLocationOn,
  MdHistoryToggleOff,
} from "react-icons/md";

const Career = () => {
  const { theme } = useContext(MainContext);

  const jobs = [
    {
      role: "Frontend Developer",
      type: "Full-time",
      location: "Remote",
      experience: "2+ Years",
      accent: "bg-blue-500/10",
    },
    {
      role: "Backend Engineer (Node.js)",
      type: "Full-time",
      location: "Hybrid (Dhaka)",
      experience: "3+ Years",
      accent: "bg-emerald-500/10",
    },
    {
      role: "UI/UX Designer",
      type: "Contract",
      location: "Remote",
      experience: "1+ Years",
      accent: "bg-purple-500/10",
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 ${
        theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            Build the Future <span className="text-sky-500">With Us</span>
          </h1>
          <p
            className={`max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            We are always looking for talented individuals to join our team. If
            you are passionate about SaaS and supply chain technology, we want
            to hear from you.
          </p>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {jobs.map((job, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`relative sm:p-8 p-5 overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 shadow-xl"
                  : "bg-gray-50 border-gray-100 shadow-lg shadow-gray-200"
              }`}
            >
              {/* Corner Accent */}
              <div
                className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${job.accent}`}
              ></div>

              <div className="text-sky-500 text-3xl mb-4">
                <MdWorkOutline />
              </div>
              <h3 className="text-xl font-bold mb-4">{job.role}</h3>

              <div
                className={`space-y-2 text-sm ${
                  theme === "dark" ? "text-slate-400" : "text-gray-500"
                }`}
              >
                <p className="flex items-center gap-2">
                  <MdHistoryToggleOff /> {job.type}
                </p>
                <p className="flex items-center gap-2">
                  <MdLocationOn /> {job.location}
                </p>
                <p className="font-semibold text-sky-500 tracking-wider">
                  EXP: {job.experience}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA / Application Section */}
        <div
          data-aos="zoom-in"
          className={`sm:p-10 p-4 rounded-3xl text-center border-2 border-dashed ${
            theme === "dark"
              ? "bg-slate-900/50 border-slate-800"
              : "bg-sky-50 border-sky-200"
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-500 text-white text-3xl mb-6 shadow-lg shadow-sky-500/20">
            <MdEmail />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Apply?</h2>
          <p
            className={`mb-6 max-w-xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            We value talent over templates. To apply for any position, please
            send your updated CV and portfolio directly to our HR department.
          </p>

          <div className="inline-block px-8 py-4 rounded-xl bg-slate-900 text-white font-mono text-lg md:text-xl border border-slate-700 shadow-2xl">
            hr@nextrun.com
          </div>

          <p
            className={`mt-6 text-xs uppercase tracking-widest font-bold ${
              theme === "dark" ? "text-slate-500" : "text-sky-600"
            }`}
          >
            Response time: 3-5 working days
          </p>
        </div>
      </div>
    </section>
  );
};

export default Career;
