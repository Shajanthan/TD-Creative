import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa'

const ProjectModal = ({ project, isOpen, onClose, onNext, onPrevious, hasNext, hasPrevious }) => {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50"
            onClick={onClose}
          />
          {/* Navigation Buttons - Outside the modal */}
          {hasPrevious && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={onPrevious}
              className="fixed left-4 top-1/2 -translate-y-1/2 z-[60] w-14 h-14 bg-white text-gray-800 rounded-full flex items-center justify-center hover:bg-gray-100 shadow-lg transition-all hover:scale-110"
            >
              <FaChevronLeft className="text-xl" />
            </motion.button>
          )}
          {hasNext && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={onNext}
              className="fixed right-4 top-1/2 -translate-y-1/2 z-[60] w-14 h-14 bg-white text-gray-800 rounded-full flex items-center justify-center hover:bg-gray-100 shadow-lg transition-all hover:scale-110"
            >
              <FaChevronRight className="text-xl" />
            </motion.button>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-8 bg-white rounded-lg z-50 overflow-y-auto"
          >
            <div className="relative h-full">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <FaTimes />
              </button>

              <div className="p-6 md:p-12">
                {/* Images */}
                <div className="mb-8">
                  {project.images && project.images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.images.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="overflow-hidden rounded-lg shadow-lg"
                        >
                          <img
                            src={image}
                            alt={`${project.name} ${index + 1}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">No images available</p>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">{project.name}</h2>
                  
                  {project.description && (
                    <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  )}

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {project.role && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Role</h3>
                        <p className="text-gray-600">{project.role}</p>
                      </div>
                    )}
                    {project.tools && project.tools.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Tools Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Client Testimonial */}
                  {project.testimonial && (
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${
                              i < (project.rating || 5)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 italic mb-2">"{project.testimonial}"</p>
                      {project.clientName && (
                        <p className="text-gray-600 font-semibold">— {project.clientName}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal

