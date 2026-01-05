import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

const Toast = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="bg-white rounded-lg shadow-lg p-4 min-w-[300px] max-w-md border-l-4 flex items-start gap-3"
            style={{
              borderLeftColor:
                toast.type === "success"
                  ? "#10b981"
                  : toast.type === "error"
                  ? "#ef4444"
                  : toast.type === "warning"
                  ? "#f59e0b"
                  : "#3b82f6",
            }}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === "success" && (
                <FaCheckCircle className="text-green-500 text-xl" />
              )}
              {toast.type === "error" && (
                <FaTimesCircle className="text-red-500 text-xl" />
              )}
              {toast.type === "warning" && (
                <FaExclamationCircle className="text-yellow-500 text-xl" />
              )}
              {toast.type === "info" && (
                <FaInfoCircle className="text-blue-500 text-xl" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;

