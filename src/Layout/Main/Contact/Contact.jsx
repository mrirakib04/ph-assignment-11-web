import { useContext, useState } from "react";
import MainContext from "../../../Context/MainContext";
import { MdEmail, MdPhone, MdLocationOn, MdSend } from "react-icons/md";
import { toast } from "react-toastify";

const Contact = () => {
  const { theme } = useContext(MainContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    }
  };

  const contactInfo = [
    {
      icon: <MdEmail />,
      title: "Email Us",
      detail: "support@nextrun.com",
      accent: "bg-blue-500/10",
    },
    {
      icon: <MdPhone />,
      title: "Call Us",
      detail: "+880 1234 567 890",
      accent: "bg-emerald-500/10",
    },
    {
      icon: <MdLocationOn />,
      title: "Office",
      detail: "Tongi, Dhaka, Bangladesh",
      accent: "bg-sky-500/10",
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors overflow-hidden duration-500 ${
        theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            Get In <span className="text-sky-500">Touch</span>
          </h1>
          <p
            className={`max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Have questions or need assistance? Our team is here to help you
            optimize your tracking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-1 flex flex-col h-full gap-5">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                data-aos="fade-right"
                data-aos-delay={index * 100}
                className={`relative p-6 rounded-2xl h-full border overflow-hidden transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-slate-900 border-slate-800"
                    : "bg-gray-50 border-gray-100 shadow-sm"
                }`}
              >
                <div
                  className={`absolute -top-4 -right-4 w-16 h-16 rounded-full ${info.accent}`}
                ></div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl text-sky-500">{info.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{info.title}</h4>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-gray-600"
                      }`}
                    >
                      {info.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Contact Form */}
          <div
            data-aos="fade-left"
            className={`lg:col-span-2 sm:p-8 p-4 md:p-12 rounded-3xl border transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-900 border-slate-800 shadow-2xl"
                : "bg-white border-gray-100 shadow-2xl shadow-gray-200"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your Name"
                    className={`w-full p-4 rounded-xl border-2 outline-none transition-all ${
                      theme === "dark"
                        ? "bg-slate-950 border-slate-800 focus:border-sky-500"
                        : "bg-gray-50 border-gray-100 focus:border-sky-500"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email Address"
                    className={`w-full p-4 rounded-xl border-2 outline-none transition-all ${
                      theme === "dark"
                        ? "bg-slate-950 border-slate-800 focus:border-sky-500"
                        : "bg-gray-50 border-gray-100 focus:border-sky-500"
                    }`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="How can we help you?"
                  className={`w-full p-4 rounded-xl border-2 outline-none transition-all resize-none ${
                    theme === "dark"
                      ? "bg-slate-950 border-slate-800 focus:border-sky-500"
                      : "bg-gray-50 border-gray-100 focus:border-sky-500"
                  }`}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full md:w-max px-10 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Send Message <MdSend className="text-xl" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
