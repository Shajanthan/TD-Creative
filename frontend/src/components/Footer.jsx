import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0d2d3f] text-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Upper Section - Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* TD Creative (PVT) LTD. */}
          <div className="text-left">
            <h3 className="text-xl font-bold mb-4">TD Creative (PVT) LTD.</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Transforming ideas into stunning visual experiences. Specializing
              in brand identity, UI/UX design, and creative solutions.
            </p>
            <p className="text-gray-300 mb-2">Est. 2020</p>
            <p className="text-gray-300">Trusted by 100+ clients worldwide</p>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services - Hidden on mobile */}
          <div className="hidden md:block text-left">
            <h4 className="text-xl font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Brand Identity
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  UI/UX Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Web Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Packaging Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Marketing Materials
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="text-left">
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">tdcreative428@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">+94770118026</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>No.64, Kilitown, Kilinochchi</p>
                  <p>Sri Lanka</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section - Follow Us */}
        <div className="py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <h4 className="text-xl font-bold">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#094162] rounded-lg flex items-center justify-center hover:bg-[#094162]/80 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#094162] rounded-lg flex items-center justify-center hover:bg-[#094162]/80 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#094162] rounded-lg flex items-center justify-center hover:bg-[#094162]/80 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright and Legal Links */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-left md:text-center">
            <p className="text-gray-300">
              © {currentYear} TDCreative. All rights reserved.
            </p>

            <p className="text-gray-300">
              Designed with <span className="text-red-500">❤️</span> by
              Professional Graphic Designer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
