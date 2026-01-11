import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const whatsappNumber = "+94775204322";
  const defaultMessage = "Hello! I'd like to get in touch.";

  const handleWhatsAppClick = () => {
    // Format phone number (remove all non-numeric characters except +)
    const formattedNumber = whatsappNumber.replace(/[^\d+]/g, "");
    // Create WhatsApp URL with pre-filled message
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(defaultMessage)}`;
    // Open WhatsApp Web in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-[#20BA5A] transition-colors"
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
    </motion.button>
  );
};

export default WhatsAppButton;


