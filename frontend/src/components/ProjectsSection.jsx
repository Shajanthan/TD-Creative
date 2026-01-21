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

  // Disable background scroll when mobile modal is open
  useEffect(() => {
    if (showMobileModal) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Re-enable scroll
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [showMobileModal]);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    // On mobile, show modal; on desktop, just update selection
    if (window.innerWidth < 1024) {
      setShowMobileModal(true);
    }
  };

  const closeMobileModal = () => {
    setShowMobileModal(false);
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-28 px-4 bg-white overflow-x-hidden"
    >
      <div className="container mx-auto max-w-7xl text-center overflow-x-hidden">
        {/* Heading and Description */}
        <div className="mb-8">
          <div
            className="relative w-full mb-4 py-8 overflow-visible"
            style={{ isolation: "isolate" }}
          >
            <h2 className="hidden md:block text-4xl md:text-6xl lg:text-8xl xl:text-[106px] font-bold text-gray-200 absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-50 select-none pointer-events-none">
              Featured Projects
            </h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-800 relative z-10"
            >
              Featured Projects
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Explore my portfolio of successful projects across various design
            disciplines
          </motion.p>
        </div>

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
                  ? "bg-orange-500 text-white"
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
                      ? "ring-2 ring-orange-500 shadow-lg"
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
                      <div className="bg-gray-50 rounded-lg p-6 mb-6 border-l-4 border-orange-500 text-left">
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
                                    ? "text-orange-500"
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
                                className="text-gray-600 hover:text-orange-500 transition-colors"
                              >
                                <FaInstagram size={20} />
                              </a>
                            )}
                            {selectedProject.clientWebsite && (
                              <a
                                href={selectedProject.clientWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-orange-500 transition-colors"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[52] flex items-center justify-center p-4 lg:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={closeMobileModal}
                className="fixed top-12 right-6 z-[60] w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>

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
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 border-l-4 border-orange-500 text-left">
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
                                  ? "text-orange-500"
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
                    <div className="flex items-start gap-4 text-left">
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
                              className="text-gray-600 hover:text-orange-500 transition-colors"
                            >
                              <FaInstagram size={18} />
                            </a>
                          )}
                          {selectedProject.clientWebsite && (
                            <a
                              href={selectedProject.clientWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-orange-500 transition-colors"
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
