import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaBuilding } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CustomDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  icon: Icon = FaBuilding,
  name,
  required = false,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange({
      target: {
        name,
        value: optionValue,
      },
    });
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-gray-700 font-medium mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {/* Icon */}
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" />

        {/* Dropdown Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094162] focus:border-transparent text-left flex items-center justify-between transition-all duration-200 ${
            isOpen
              ? "ring-2 ring-[#094162] border-transparent"
              : "hover:border-gray-400"
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={selectedOption ? "text-gray-800" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <FaChevronDown
            className={`text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            >
              <ul
                role="listbox"
                className="py-1 max-h-60 overflow-auto custom-scrollbar"
              >
                {options.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={value === option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`px-4 py-2 cursor-pointer transition-colors duration-150 ${
                      value === option.value
                        ? "bg-[#094162] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={value || ""}
        required={required}
      />
    </div>
  );
};

export default CustomDropdown;


