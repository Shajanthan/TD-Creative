import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaPhone, FaBriefcase, FaDollarSign, FaFileAlt, FaPaperPlane } from 'react-icons/fa'
import CustomDatePicker from './CustomDatePicker'

const ReceiptRequestForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    projectService: '',
    amountPaid: '',
    date: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.phone) {
      setError('Phone number is required')
      return
    }
    if (!formData.date) {
      setError('Date is required')
      return
    }

    // Validation: All required fields
    const missingFields = [];
    if (!formData.fullName?.trim()) missingFields.push("Full Name");
    if (!formData.phone?.trim()) missingFields.push("Phone Number");
    if (!formData.projectService?.trim()) missingFields.push("Project/Service");
    if (!formData.amountPaid) missingFields.push("Amount Paid");
    if (!formData.date?.trim()) missingFields.push("Date");

    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Show success message
      setSuccess(true)
      setFormData({
        fullName: '',
        phone: '',
        projectService: '',
        amountPaid: '',
        date: '',
        notes: '',
      })
      
      // Keep success message visible for 8 seconds
      setTimeout(() => {
        setSuccess(false)
        if (onSuccess) onSuccess()
      }, 8000)
    } catch (err) {
      console.error("Receipt request error:", err)
      setError('Failed to submit request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Request Receipt</h3>

      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-green-800 mb-1">Receipt Request Sent Successfully!</p>
              <p className="text-sm">Thank you! We've received your receipt request. We'll process it and send it to you at <span className="font-medium">{formData.phone || "your provided number"}</span> shortly!</p>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094162] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+1 (234) 567-890"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094162] focus:border-transparent"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            We'll send your receipt to this number
          </p>
        </div>

        <div>
          <label htmlFor="projectService" className="block text-gray-700 font-medium mb-2">
            Project/Service <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="projectService"
              name="projectService"
              required
              value={formData.projectService}
              onChange={handleChange}
              placeholder="e.g., Logo Design, Brand Identity"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094162] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="amountPaid" className="block text-gray-700 font-medium mb-2">
              Amount Paid <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                id="amountPaid"
                name="amountPaid"
                required
                min="0"
                step="0.01"
                value={formData.amountPaid}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094162] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <CustomDatePicker
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
            Additional Notes (Optional)
          </label>
          <div className="relative">
            <FaFileAlt className="absolute left-4 top-4 text-gray-400" />
            <textarea
              id="notes"
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional information..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094162] focus:border-transparent resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-[#094162] text-white rounded-lg font-semibold hover:bg-[#0a5280] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FaPaperPlane />
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </>
  )
}

export default ReceiptRequestForm

