import { useContext } from "react";
import MainContext from "../../../Context/MainContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";

const FrequentlyAsked = () => {
  const { theme } = useContext(MainContext);

  const faqs = [
    {
      q: "How can I track my order status?",
      a: "You can track your order in real-time through your personal dashboard under the 'My Orders' section.",
    },
    {
      q: "Is there any cost for buyers?",
      a: "No, NextRun Tracker is completely free for all buyers. You only pay for the products you purchase.",
    },
    {
      q: "How do I become an administrator?",
      a: "To get admin access, please contact our sales team at sales@nextrun.com for manual account activation.",
    },
    {
      q: "What payment methods are accepted?",
      a: "Currently, we support manual payment methods for administrators. Contact sales for more details.",
    },
  ];

  // Accordion Custom Styles based on theme
  const accordionStyles = {
    backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff", // slate-800 or white
    color: theme === "dark" ? "#f1f5f9" : "#1e293b",
    border: `1px solid ${theme === "dark" ? "#334155" : "#f1f5f9"}`,
    boxShadow: "none",
    "&:before": { display: "none" },
    borderRadius: "12px !important",
    overflow: "hidden",
    marginBottom: "12px",
  };

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
            Frequently Asked <span className="text-sky-500">Questions</span>
          </h2>
          <p
            className={`mt-3 max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Quick answers to the most common questions about our platform and
            services.
          </p>
        </div>

        {/* FAQ Grid - 3 Columns with MUI Accordion */}
        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <Accordion sx={accordionStyles}>
                <AccordionSummary
                  expandIcon={
                    <MdExpandMore
                      className={
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }
                    />
                  }
                >
                  {/* Question - Small size */}
                  <span className="text-sm font-bold tracking-tight">
                    {faq.q}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  {/* Answer - Medium size */}
                  <p
                    className={`text-base leading-relaxed ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    {faq.a}
                  </p>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAsked;
