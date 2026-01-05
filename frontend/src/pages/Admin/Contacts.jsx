import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaCheck,
  FaWhatsapp,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaPhone,
  FaBuilding,
  FaEnvelope,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../../utils/api";
import AdminNavbar from "../../components/AdminNavbar";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get("/admin/contacts");
      // Sort: pending/new first (newest first), then completed sorted by date (oldest first)
      const sorted = response.data.sort((a, b) => {
        // If both are pending/new or both are completed
        if (a.status === b.status) {
          if (a.status === "completed") {
            // Both completed: sort by date oldest first
            return new Date(a.createdAt) - new Date(b.createdAt);
          }
          // Both pending/new: sort by date newest first
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        // Pending/new comes before completed
        if (a.status !== "completed") return -1;
        if (b.status !== "completed") return 1;
        return 0;
      });
      setContacts(sorted);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/admin/contacts/${id}`, { status });
      setCurrentPage(1); // Reset to first page after status update
      fetchContacts();
      if (showModal) setShowModal(false);
      showToast("Contact marked as done successfully!", "success");
    } catch (err) {
      console.error("Failed to update status:", err);
      showToast("Failed to update contact status", "error");
    }
  };

  const openWhatsApp = (phone) => {
    // Format phone number (remove any non-digit characters except +)
    const formattedPhone = phone.replace(/[^\d+]/g, "");
    const whatsappUrl = `https://wa.me/${formattedPhone}`;
    window.open(whatsappUrl, "_blank");
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  // Calculate pagination
  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedContacts = contacts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <Toast toasts={toasts} removeToast={removeToast} />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    WhatsApp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inquiry Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedContacts.map((contact, index) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {(startIndex + index + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.phone ? (
                        <a
                          href={`https://wa.me/${contact.phone.replace(
                            /[^\d+]/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800 flex items-center gap-1"
                        >
                          <FaWhatsapp />
                          {contact.phone}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.inquiryType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          contact.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => openModal(contact)}
                          className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                        >
                          <FaEye /> View
                        </button>
                        {contact.status !== "completed" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(contact.id, "completed")
                            }
                            className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                          >
                            <FaCheck /> Done
                          </button>
                        )}
                        {contact.phone && (
                          <button
                            onClick={() => openWhatsApp(contact.phone)}
                            className="px-3 py-1.5 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
                          >
                            <FaWhatsapp /> WhatsApp
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {contacts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No contact submissions found
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {contacts.length > 0 && (
          <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-md">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(endIndex, contacts.length)}
              </span>{" "}
              of <span className="font-medium">{contacts.length}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <FaChevronLeft /> Previous
              </button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          currentPage === page
                            ? "bg-primary-600 text-white"
                            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#094162] to-[#0a5280] text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    Contact Submission Details
                  </h2>
                  <p className="text-blue-100 text-sm">
                    Submission #{selectedContact.id.slice(-8)}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#094162] text-white p-2 rounded-lg">
                        <FaUser />
                      </div>
                      <label className="font-semibold text-gray-700">Name</label>
                    </div>
                    <p className="text-gray-800 font-medium ml-12">
                      {selectedContact.name}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-500 text-white p-2 rounded-lg">
                        <FaPhone />
                      </div>
                      <label className="font-semibold text-gray-700">
                        WhatsApp Number
                      </label>
                    </div>
                    {selectedContact.phone ? (
                      <a
                        href={`https://wa.me/${selectedContact.phone.replace(
                          /[^\d+]/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 flex items-center gap-2 ml-12 font-medium"
                      >
                        <FaWhatsapp />
                        {selectedContact.phone}
                      </a>
                    ) : (
                      <p className="text-gray-500 ml-12">N/A</p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-purple-500 text-white p-2 rounded-lg">
                        <FaBuilding />
                      </div>
                      <label className="font-semibold text-gray-700">
                        Inquiry Type
                      </label>
                    </div>
                    <p className="text-gray-800 font-medium ml-12">
                      {selectedContact.inquiryType}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-500 text-white p-2 rounded-lg">
                        <FaCalendarAlt />
                      </div>
                      <label className="font-semibold text-gray-700">Date</label>
                    </div>
                    <p className="text-gray-800 font-medium ml-12">
                      {new Date(selectedContact.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`${
                          selectedContact.status === "completed"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        } text-white p-2 rounded-lg`}
                      >
                        {selectedContact.status === "completed" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaClock />
                        )}
                      </div>
                      <label className="font-semibold text-gray-700">Status</label>
                    </div>
                    <span
                      className={`ml-12 px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedContact.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedContact.status.charAt(0).toUpperCase() +
                        selectedContact.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-500 text-white p-2 rounded-lg">
                    <FaEnvelope />
                  </div>
                  <label className="font-semibold text-gray-700">Message</label>
                </div>
                <p className="text-gray-700 ml-12 whitespace-pre-wrap leading-relaxed">
                  {selectedContact.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                {selectedContact.phone && (
                  <button
                    onClick={() => openWhatsApp(selectedContact.phone)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-semibold shadow-md"
                  >
                    <FaWhatsapp /> Open WhatsApp
                  </button>
                )}
                {selectedContact.status !== "completed" && (
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedContact.id, "completed");
                    }}
                    className="px-6 py-3 bg-[#094162] text-white rounded-lg hover:bg-[#0a5280] transition-colors flex items-center gap-2 font-semibold shadow-md"
                  >
                    <FaCheck /> Mark as Done
                  </button>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;

