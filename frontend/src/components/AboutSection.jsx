import { motion } from "framer-motion";
import tdLogo from "../img/TD.png";
import danujan from "../img/Danujan.jpeg";

// Add your profile image to src/img/ folder and import it here
// Example: import profileImage from "../img/profile.jpg";
// For now using a placeholder - replace with your image
const profileImage = danujan;

const AboutSection = () => {
  const stats = [
    { number: "07", label: "Years" },
    { number: "600+", label: "Completed Projects" },
    { number: "250+", label: "Satisfied Clients" },
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center px-4 bg-white overflow-x-hidden"
    >
      <div className="container mx-auto max-w-7xl w-full py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-[#094162]">Hello! I'm </span>
              <span className="text-orange-500">TD</span>
            </motion.h2>

            {/* Biography */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-[#094162] leading-relaxed max-w-lg"
            >
              the creative force behind TD creative Graphic Designs. I believe
              design is more than just making things look pretty; it's about
              solving complex problems with elegant visual solutions. My journey
              began 7 years ago with a passion for typography and has evolved
              into a comprehensive approach to brand identity and user
              experience.
            </motion.p>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-8 md:gap-12 pt-6 justify-center md:justify-start"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center md:items-start"
                >
                  <span className="text-5xl md:text-6xl font-bold text-orange-500">
                    {stat.number}
                  </span>
                  <span className="text-base md:text-lg text-[#094162] font-medium mt-2">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Section - Photo with Logo Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-visible"
          >
            <div className="relative w-full max-w-[250px] lg:max-w-md mx-auto overflow-visible">
              {/* Portrait Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="w-full lg:h-[600px] h-[400px] rounded-lg overflow-hidden shadow-2xl bg-gray-200"
              >
                <img
                  src={profileImage}
                  alt="TD Creative"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Circular Logo Overlay - centered vertically on image */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute top-[170px] lg:top-[250px] -translate-y-1/2 -right-[40px] md:-right-[30px] lg:-right-[50px] w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-2 md:p-3 shadow-lg flex items-center justify-center z-10"
              >
                <img
                  src={tdLogo}
                  alt="TD Logo"
                  className="w-full h-full object-contain scale-150"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
