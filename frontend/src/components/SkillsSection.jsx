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
      icon: "Ps",
      color: "bg-blue-600",
      function: "Photo Editing",
    },
    {
      name: "Adobe Illustrator",
      icon: "Ai",
      color: "bg-orange-600",
      function: "Vector Graphics",
    },
    {
      name: "Adobe InDesign",
      icon: "Id",
      color: "bg-red-700",
      function: "Layout & Publishing",
    },
    {
      name: "After Effects",
      icon: "Ae",
      color: "bg-purple-600",
      function: "Motion Graphics",
    },
    {
      name: "Lightroom",
      icon: "Lr",
      color: "bg-blue-500",
      function: "Image Editing",
    },
  ];

  return (
    <section id="skills" className="min-h-screen py-28 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tools I Use
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional design tools and software to deliver high-quality
            creative work
          </p>
        </motion.div>

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
              <div
                className={`${tool.color} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4`}
              >
                <span className="text-white text-2xl font-bold">
                  {tool.icon}
                </span>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Services Provided
            </h2>
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
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
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
