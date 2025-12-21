const Footer = () => {
  return (
    <div className="w-full bg-linear-to-br from-green-950 via-black to-teal-950 py-10 sm:px-8 px-5 flex flex-col items-center">
      <div className="flex flex-wrap justify-between items-start gap-5 w-full py-5 border-b border-gray-500">
        <div className="flex flex-col items-start gap-3">
          <h4 className="bg-linear-to-br from-teal-300 to-purple-300 bg-clip-text font-serif text-transparent font-bold italic text-2xl">
            NextRun Tracker
          </h4>
          <p className="max-w-xs font-medium text-gray-300">
            NextRun Tracker is an all-in-one SaaS platform for managing orders,
            production stages, payments, and delivery tracking with full
            visibility and control.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h5 className="font-semibold text-white text-lg">Company</h5>
          <ul className="font-medium text-gray-400 flex flex-col items-start gap-1">
            <li>
              <a href="#" className="hover:text-white transition duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-300">
                Our Mission
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h5 className="font-semibold text-white text-lg">Information</h5>
          <ul className="font-medium text-gray-400 flex flex-col items-start gap-1">
            <li>
              <a href="#" className="hover:text-white transition duration-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-300">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-300">
                Join Us
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h5 className="font-semibold text-white text-lg">Social</h5>
          <ul className="font-medium text-gray-400 flex flex-col items-start gap-2">
            <li>
              <a
                href="#"
                className="hover:text-white transition duration-300 items-center flex gap-1 group"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition duration-300 items-center flex gap-1 group"
              >
                Youtube
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/NextRun1/"
                target="_blank"
                className="hover:text-white transition duration-300 items-center flex gap-1 group"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition duration-300 items-center flex gap-1 group"
              >
                support@NextRunTracker.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="font-medium text-gray-300 text-center mt-5">
        ©NextRun Tracker. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
