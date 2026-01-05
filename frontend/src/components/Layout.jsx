import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import tdLogo from "../img/TD.png";

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "projects",
        "skills",
        "feedback",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash navigation on mount
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);

  const navItems = [
    { sectionId: "home", label: "Home" },
    { sectionId: "about", label: "About" },
    { sectionId: "projects", label: "Projects" },
    { sectionId: "skills", label: "Skills & Services" },
  ];

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    // Navigate to home if not already there
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Navigation Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 bg-white ${
          isScrolled || isMobileMenuOpen ? "shadow-md" : ""
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Name */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Logo */}
              <img
                src={tdLogo}
                alt="TD Creative Logo"
                className="h-10 w-auto object-contain"
              />
              {/* Brand Name */}
              <span className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">
                TD Creative
              </span>
            </button>

            {/* Center Navigation Menu */}
            <div className="hidden md:flex items-center">
              <div className="bg-gray-50 border border-gray-300 rounded-full px-6 py-3 flex items-center gap-14">
                {navItems.map((item) => (
                  <button
                    key={item.sectionId}
                    onClick={() => scrollToSection(item.sectionId)}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === item.sectionId
                        ? "text-gray-900 font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Us Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden md:block px-6 py-2 border-2 border-orange-500 bg-white text-orange-500 rounded-full font-medium hover:bg-orange-50 transition-colors"
            >
              Contact Us
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-200"
            >
              <ul className="flex flex-col space-y-4 pt-4">
                {navItems.map((item) => (
                  <li key={item.sectionId}>
                    <button
                      onClick={() => scrollToSection(item.sectionId)}
                      className={`text-sm font-medium transition-colors w-full text-left ${
                        activeSection === item.sectionId
                          ? "text-gray-900 font-semibold"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="w-full px-4 py-2 border-2 border-orange-500 bg-white text-orange-500 rounded-full font-medium hover:bg-orange-50 transition-colors text-center"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </nav>
      </motion.header>
      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
