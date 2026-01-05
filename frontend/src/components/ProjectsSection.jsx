import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaInstagram, FaGlobe, FaTimes } from "react-icons/fa";
import { projects } from "../data/projects";

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(projects[0] || null);
  const [showMobileModal, setShowMobileModal] = useState(false);

  // Dynamically generate categories from projects
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Set first project as selected initially and when category changes
  useEffect(() => {
    if (filteredProjects.length > 0) {
      setSelectedProject(filteredProjects[0]);
    }
  }, [selectedCategory]);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    // On mobile, show modal; on desktop, just update selection
    if (window.innerWidth < 1024) {
      setShowMobileModal(true);
    }
  };

  return (
    <section id="projects" className="min-h-screen py-28 px-4 bg-white">
      <div className="container mx-auto max-w-7xl text-center">
        {/* Heading and Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600">
            Explore my portfolio of successful projects across various design
            disciplines
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-[#094162] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Side - Project List */}
          <div className="lg:col-span-1 w-full">
            <div className="space-y-4 p-2 lg:h-[850px] lg:overflow-y-auto lg:custom-scrollbar">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  onClick={() => handleProjectSelect(project)}
                  className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
                    selectedProject?.id === project.id
                      ? "ring-2 ring-[#094162] shadow-lg"
                      : "hover:shadow-lg"
                  }`}
                >
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {project.category || "Branding"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Project Detail Panel (Hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-lg shadow-xl overflow-hidden h-[850px] flex flex-col"
                >
                  {/* Header Section */}
                  <div className="relative h-64 bg-gradient-to-br from-[#094162] via-[#0a5280] to-[#094162]">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <img
                      src={selectedProject.thumbnail}
                      alt={selectedProject.name}
                      className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <h2 className="text-4xl font-bold mb-2">
                        {selectedProject.name}
                      </h2>
                      <p className="text-lg opacity-90">
                        {selectedProject.category || "Web Design"}
                      </p>
                    </div>
                  </div>

                  {/* Project Overview */}
                  <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Project Overview
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {selectedProject.description}
                    </p>

                    {/* Testimonial */}
                    {selectedProject.testimonial && (
                      <div className="bg-gray-50 rounded-lg p-6 mb-6 border-l-4 border-[#094162]">
                        <p className="text-gray-700 italic mb-3">
                          "{selectedProject.testimonial}"
                        </p>
                        <p className="text-gray-600 text-sm">
                          - {selectedProject.clientName}
                          {selectedProject.clientRole &&
                            `, ${selectedProject.clientRole}`}
                          {selectedProject.clientCompany &&
                            ` of ${selectedProject.clientCompany}`}
                        </p>
                        {/* Rating */}
                        {selectedProject.rating && (
                          <div className="flex gap-1 mt-3">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`${
                                  i < selectedProject.rating
                                    ? "text-[#094162]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Client Section */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Client
                      </h3>
                      <div className="flex items-start gap-8 text-left">
                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              selectedProject.clientName || "Client"
                            )}&background=094162&color=fff`}
                            alt={selectedProject.clientName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800">
                            {selectedProject.clientName || "Client Name"}
                          </h4>
                          {selectedProject.clientRole && (
                            <p className="text-gray-600">
                              {selectedProject.clientRole}
                            </p>
                          )}
                          {selectedProject.clientCompany && (
                            <p className="text-gray-600">
                              {selectedProject.clientCompany}
                            </p>
                          )}
                          {selectedProject.clientLink && (
                            <a
                              href={selectedProject.clientLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm mt-2 block"
                            >
                              Link - {selectedProject.clientLink}
                            </a>
                          )}
                          <div className="flex gap-3 mt-3">
                            {selectedProject.clientInstagram && (
                              <a
                                href={selectedProject.clientInstagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#094162] transition-colors"
                              >
                                <FaInstagram size={20} />
                              </a>
                            )}
                            {selectedProject.clientWebsite && (
                              <a
                                href={selectedProject.clientWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#094162] transition-colors"
                              >
                                <FaGlobe size={20} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Modal for Project Details */}
        {showMobileModal && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 lg:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Close Button */}
              <div className="sticky top-0 bg-white z-10 flex justify-end p-4 border-b">
                <button
                  onClick={() => setShowMobileModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Project Details Content */}
              <div className="flex flex-col">
                {/* Header Section */}
                <div className="relative h-48 bg-gradient-to-br from-[#094162] via-[#0a5280] to-[#094162]">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <img
                    src={selectedProject.thumbnail}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">
                      {selectedProject.name}
                    </h2>
                    <p className="text-base opacity-90">
                      {selectedProject.category || "Web Design"}
                    </p>
                  </div>
                </div>

                {/* Project Overview */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Project Overview
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Testimonial */}
                  {selectedProject.testimonial && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 border-l-4 border-[#094162]">
                      <p className="text-gray-700 italic mb-3">
                        "{selectedProject.testimonial}"
                      </p>
                      <p className="text-gray-600 text-sm">
                        - {selectedProject.clientName}
                        {selectedProject.clientRole &&
                          `, ${selectedProject.clientRole}`}
                        {selectedProject.clientCompany &&
                          ` of ${selectedProject.clientCompany}`}
                      </p>
                      {/* Rating */}
                      {selectedProject.rating && (
                        <div className="flex gap-1 mt-3">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`${
                                i < selectedProject.rating
                                  ? "text-[#094162]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Client Section */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Client
                    </h3>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            selectedProject.clientName || "Client"
                          )}&background=094162&color=fff`}
                          alt={selectedProject.clientName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-gray-800">
                          {selectedProject.clientName || "Client Name"}
                        </h4>
                        {selectedProject.clientRole && (
                          <p className="text-gray-600 text-sm">
                            {selectedProject.clientRole}
                          </p>
                        )}
                        {selectedProject.clientCompany && (
                          <p className="text-gray-600 text-sm">
                            {selectedProject.clientCompany}
                          </p>
                        )}
                        {selectedProject.clientLink && (
                          <a
                            href={selectedProject.clientLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm mt-2 block"
                          >
                            Link - {selectedProject.clientLink}
                          </a>
                        )}
                        <div className="flex gap-3 mt-3">
                          {selectedProject.clientInstagram && (
                            <a
                              href={selectedProject.clientInstagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-[#094162] transition-colors"
                            >
                              <FaInstagram size={18} />
                            </a>
                          )}
                          {selectedProject.clientWebsite && (
                            <a
                              href={selectedProject.clientWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-[#094162] transition-colors"
                            >
                              <FaGlobe size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
