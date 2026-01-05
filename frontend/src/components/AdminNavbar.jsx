import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const AdminNavbar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/receipt-requests", label: "Receipt Requests" },
    { path: "/admin/contacts", label: "Contacts" },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm md:text-base text-gray-700 hover:text-red-600 transition-colors"
            >
              <FaSignOutAlt /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-b fixed top-[65px] left-0 right-0 z-40 h-[57px]">
        <div className="container mx-auto px-4 h-full">
          <div className="flex space-x-6 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  isActive(link.path)
                    ? "border-primary-600 text-primary-600 font-medium"
                    : "border-transparent text-gray-600 hover:text-primary-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-b fixed top-[57px] left-0 right-0 z-40 shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-primary-50 text-primary-600 font-medium border-l-4 border-primary-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-[57px] md:h-[122px]"></div>
    </>
  );
};

export default AdminNavbar;

