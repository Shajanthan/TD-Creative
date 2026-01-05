import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import ReceiptRequestForm from "./ReceiptRequestForm";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaPaperPlane,
  FaFileAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt,
} from "react-icons/fa";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    inquiryType: "General Inquiry",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showReceiptForm, setShowReceiptForm] = useState(false);

  // Scroll to contact section when receipt form is shown
  useEffect(() => {
    if (showReceiptForm) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          // Calculate position with offset for header
          const headerOffset = 80;
          const elementPosition = contactSection.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 150);
    }
  }, [showReceiptForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");
    setSuccess(false);

    // Get current form data values directly from the form
    const form = e.target;
    const formDataObj = {
      name: form.name?.value?.trim() || formData.name?.trim() || "",
      phone: form.phone?.value?.trim() || formData.phone?.trim() || "",
      message: form.message?.value?.trim() || formData.message?.trim() || "",
      inquiryType:
        form.inquiryType?.value?.trim() || formData.inquiryType?.trim() || "",
    };

    // Debug logging
    console.log("Form submission data:", formDataObj);
    console.log("FormData state:", formData);

    // Validation: All fields are required
    const missingFields = [];
    if (!formDataObj.name) missingFields.push("name");
    if (!formDataObj.phone) missingFields.push("phone");
    if (!formDataObj.message) missingFields.push("message");
    if (!formDataObj.inquiryType) missingFields.push("inquiryType");

    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/contact", formDataObj);
      console.log("Contact form success:", response.data);

      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        message: "",
        inquiryType: "General Inquiry",
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Contact form error:", err.response?.data || err.message);
      const errorMessage =
        err.response?.data?.message || err.response?.data?.error || err.message;
      setError(errorMessage || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-28 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Have a project in mind or need a receipt? I'm here to help
          </p>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowReceiptForm(false)}
              className={`px-6 py-3 text-sm lg:text-base rounded-full font-medium transition-colors flex items-center gap-2 ${
                !showReceiptForm
                  ? "bg-[#094162] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <FaFileAlt
                className={!showReceiptForm ? "text-white" : "text-gray-700"}
              />
              Contact Form
            </button>
            <button
              onClick={() => setShowReceiptForm(true)}
              className={`px-6 py-3 text-sm lg:text-base rounded-full font-medium transition-colors flex items-center gap-2 ${
                showReceiptForm
                  ? "bg-[#094162] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <FaDollarSign
                className={showReceiptForm ? "text-white" : "text-gray-700"}
              />
              Request Receipt
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Information Panels (Always Visible) */}
          <div className="space-y-6">
            {/* Contact Information Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <FaEnvelope className="text-[#094162] text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-sm text-gray-600">hello@designer.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaPhoneAlt className="text-[#094162] text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <p className="text-sm text-gray-600">+1 (234) 567-890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-[#094162] text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Location</p>
                    <p className="text-sm text-gray-600">San Francisco, CA</p>
                    <p className="text-sm text-gray-600">United States</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business Hours Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#094162] rounded-lg shadow-md p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaClock className="text-white text-xl" />
                <h3 className="text-xl font-bold text-white">Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Sunday</span>
                  <span className="text-orange-400">Closed</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form (Contact Form or Receipt Request) */}
          {!showReceiptForm ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              {success && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Send Me a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094162] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094162] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div>
                  <label
                    htmlFor="inquiryType"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Type of Inquiry <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094162] focus:border-transparent appearance-none"
                    >
                      <option value="New Order">New Order</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Receipt Request">Receipt Request</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094162] focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#094162] text-white rounded-lg font-semibold hover:bg-[#0a5280] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="receipt-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <ReceiptRequestForm onSuccess={() => setShowReceiptForm(false)} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
