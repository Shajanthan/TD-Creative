import { motion } from "framer-motion";
import tdLogo from "../img/TD.png";
import bgImage from "../img/bg.jpeg";

const HomeSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-x-hidden"
    >
      <div className="absolute inset-0 flex">
        <div className="hidden lg:block lg:w-1/2 bg-[rgb(213,217,223)]"></div>
        <div
          className="w-full lg:w-1/2 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 my-2 sm:py-12 md:py-20 w-full max-w-full relative z-10 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto w-full">
          {/* Left Section - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 sm:space-y-4 md:space-y-6 text-center md:text-left order-2 md:order-1 w-full px-2 sm:px-0"
          >
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.3] break-words"
            >
              <span className="text-[#094162] block mb-1 sm:mb-2">We Build</span>
              <span className="text-[#094162] block mb-1 sm:mb-2">
                <span className="text-orange-500">Brands</span>
              </span>
              <span className="text-[#094162] block">That Stand Out.</span>
            </motion.h1>

            {/* Body Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-lg mx-auto md:mx-0 py-2 sm:py-3 px-2 sm:px-0"
            >
              Crafting visually compelling stories that elevate brands. Based in
              Sri Lanka, I specialize in bespoke branding, print design, and
              digital experiences.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center md:justify-start px-2 sm:px-0"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-orange-500 text-white rounded-3xl font-semibold hover:bg-orange-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                Explore More
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 border-2 border-[#094162] text-[#094162] bg-white rounded-3xl font-semibold hover:bg-[#094162] hover:text-white transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>

          {/* Right Section - TD Logo Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:flex items-center justify-center md:justify-end order-1 md:order-2 w-full overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] flex items-center justify-center overflow-hidden"
            >
              <img
                src={tdLogo}
                alt="TD Creative Logo"
                className="w-full h-full object-contain scale-100 sm:scale-105 md:scale-110 lg:scale-115 xl:scale-125 max-w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
