import Marquee from "react-fast-marquee";

// demo partner logos (replace with your real ones)
import P1 from "./../../../assets/partners/dfc.jpg";
import P2 from "./../../../assets/partners/mrir_with_bg.jpg";
import P3 from "./../../../assets/partners/logo-with-bg.jpg";
import P4 from "./../../../assets/partners/ie_logo.jpg";
import P5 from "./../../../assets/partners/sb4.jpg";
import P6 from "./../../../assets/partners/sb5.jpg";

const OurPartners = () => {
  const partners = [P1, P2, P3, P4, P5, P6];

  return (
    <section className="w-full py-16 bg-linear-to-b from-teal-100 via-white to-white px-2">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900">
        Our Trusted Partners
      </h2>

      {/* Subtitle */}
      <p className="text-center text-gray-600 mt-3 mb-12 text-base sm:text-lg max-w-2xl mx-auto">
        We collaborate with reliable brands and organizations to ensure smooth
        operations, secure payments, and on-time delivery tracking.
      </p>

      {/* Marquee */}
      <div className="md:w-10/12 w-full mx-auto bg-white border border-gray-200 shadow-lg shadow-gray-300 rounded-xl py-4">
        <Marquee speed={70} pauseOnHover gradient gradientWidth={60}>
          {partners.map((logo, index) => (
            <div key={index} className="mx-8 flex items-center justify-center">
              <img
                src={logo}
                alt="Partner Logo"
                className="h-40 sm:h-40 w-auto object-contain border border-gray-200 rounded-lg shadow-md shadow-gray-300 bg-white p-3"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default OurPartners;
