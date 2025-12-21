import { MdSecurity, MdTimeline, MdInsights, MdVerified } from "react-icons/md";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Secure Payments",
      subtitle:
        "All transactions are encrypted and safely stored for finance tracking.",
      icon: <MdSecurity className="text-4xl text-blue-700" />,
      border: "border-blue-500",
      shadow: "shadow-blue-400/30",
    },
    {
      title: "Real-time Tracking",
      subtitle:
        "Track every order stage from placement to delivery in real time.",
      icon: <MdTimeline className="text-4xl text-blue-700" />,
      border: "border-blue-500",
      shadow: "shadow-blue-400/30",
    },
    {
      title: "Smart Insights",
      subtitle:
        "Get clear data insights for better decisions and faster execution.",
      icon: <MdInsights className="text-4xl text-blue-700" />,
      border: "border-blue-500",
      shadow: "shadow-blue-400/30",
    },
    {
      title: "Verified Workflow",
      subtitle:
        "Manager approval system ensures every order follows proper workflow.",
      icon: <MdVerified className="text-4xl text-blue-700" />,
      border: "border-blue-500",
      shadow: "shadow-blue-400/30",
    },
  ];

  return (
    <section className="w-full py-20 bg-linear-to-br from-teal-100 via-white to-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="md:text-4xl sm:text-3xl text-2xl font-extrabold text-gray-900">
            Why Choose NextRun Tracker
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-gray-600">
            A modern order and production tracking platform built for speed,
            transparency, and control.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl bg-white border-2 ${item.border} shadow-lg ${item.shadow} hover:scale-[1.03] transition`}
            >
              <div className="mb-4">{item.icon}</div>
              <h4 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h4>
              <p className="mt-2 text-sm text-gray-600">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
