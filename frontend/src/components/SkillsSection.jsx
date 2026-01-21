import { motion } from "framer-motion";
import {
  FaPalette,
  FaDesktop,
  FaPrint,
  FaBox,
  FaPaintBrush,
  FaChartBar,
} from "react-icons/fa";

const services = [
  {
    title: "Brand Identity Design",
    icon: <FaPalette className="text-4xl" />,
    description:
      "Complete brand identity systems that capture your company's essence and resonate with your target audience.",
    items: ["Logo Design", "Color Palette", "Typography", "Brand Guidelines"],
  },
  {
    title: "UI/UX Design",
    icon: <FaDesktop className="text-4xl" />,
    description:
      "User-centered digital experiences that are both beautiful and functional across all devices.",
    items: [
      "Website Design",
      "Mobile App Design",
      "Prototyping",
      "User Research",
    ],
  },
  {
    title: "Print Design",
    icon: <FaPrint className="text-4xl" />,
    description:
      "High-quality print materials that make a lasting impression on your customers.",
    items: ["Business Cards", "Brochures", "Posters", "Packaging"],
  },
  {
    title: "Packaging Design",
    icon: <FaBox className="text-4xl" />,
    description:
      "Eye-catching packaging that stands out on shelves and connects with consumers.",
    items: ["Product Packaging", "Label Design", "Box Design", "3D Mockups"],
  },
  {
    title: "Illustration",
    icon: <FaPaintBrush className="text-4xl" />,
    description:
      "Custom illustrations that bring your ideas to life with unique visual storytelling.",
    items: [
      "Digital Illustration",
      "Character Design",
      "Icon Sets",
      "Infographics",
    ],
  },
  {
    title: "Marketing Materials",
    icon: <FaChartBar className="text-4xl" />,
    description:
      "Compelling marketing collateral that drives engagement and conversions.",
    items: [
      "Social Media Graphics",
      "Advertisements",
      "Presentations",
      "Email Templates",
    ],
  },
];

const SkillsSection = () => {
  const tools = [
    {
      name: "Adobe Photoshop",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
      function: "Photo Editing",
    },
    {
      name: "Adobe Illustrator",
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
      function: "Vector Graphics",
    },
    {
      name: "Adobe InDesign",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg",
      function: "Layout & Publishing",
    },
    {
      name: "After Effects",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
      function: "Motion Graphics",
    },
    {
      name: "Lightroom",
      icon: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg",
      function: "Image Editing",
    },
  ];

  return (
    <section
      id="skills"
      className="min-h-screen py-28 px-4 bg-white overflow-visible"
    >
      <div className="container mx-auto max-w-6xl overflow-visible">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="relative w-full mb-4 py-8 overflow-visible"
            style={{ isolation: "isolate" }}
          >
            <h2 className="hidden md:block text-4xl md:text-6xl lg:text-8xl xl:text-[106px] font-bold text-gray-200 absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-50 select-none pointer-events-none">
              Tools I Use
            </h2>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-800 relative z-10"
            >
              Tools I Use
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Professional design tools and software to deliver high-quality
            creative work
          </motion.p>
        </div>

        {/* Tools Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-100 rounded-lg p-6 min-w-[180px] text-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 bg-white shadow-sm">
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {tool.name}
              </h3>
              {/* Function */}
              <p className="text-sm text-gray-600">{tool.function}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-lg text-gray-600">
            And many more tools to ensure the best results for every project
          </p>
        </motion.div>

        {/* Services Provided Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="relative w-full mb-4 py-8 overflow-visible"
              style={{ isolation: "isolate" }}
            >
              <h2 className="hidden md:block text-4xl md:text-6xl lg:text-8xl xl:text-[106px] font-bold text-gray-200 absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-50 select-none pointer-events-none">
                Services Provided
              </h2>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-gray-800 relative z-10"
              >
                Services Provided
              </motion.h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive graphic design services tailored to meet your
              creative needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] border border-gray-100"
                style={{
                  boxShadow: `
                    inset 0 1px 2px rgba(255, 255, 255, 0.8),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.05),
                    0 4px 8px rgba(0, 0, 0, 0.08),
                    0 2px 4px rgba(0, 0, 0, 0.06),
                    0 0 0 1px rgba(0, 0, 0, 0.03)
                  `,
                }}
              >
                {/* Icon */}
                <div className="text-orange-500 mb-4">{service.icon}</div>
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="text-gray-600 mb-4">{service.description}</p>
                {/* List Items */}
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1.5">
                        <svg className="w-2 h-2 fill-current" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="4" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
