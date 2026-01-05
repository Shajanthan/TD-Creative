import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";

const FeedbackSection = () => {
  const clientReviews = [
    {
      text: "Working with this designer was an absolute pleasure. The attention to detail and creative vision transformed our brand identity beyond our expectations. Every deliverable was on time and exceeded our quality standards. Highly recommended!",
      name: "Jennifer Martinez",
      title: "Chief Marketing Officer",
      company: "TechVision Global",
      avatar: "https://ui-avatars.com/api/?name=Jennifer+Martinez&background=094162&color=fff&size=128",
    },
    {
      text: "An exceptional designer with a unique ability to understand client needs and translate them into stunning visuals. The UI/UX work done for our mobile app resulted in a 70% increase in user engagement. Professional, creative, and reliable.",
      name: "Michael Chen",
      title: "Product Director",
      company: "InnovateLabs",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=094162&color=fff&size=128",
    },
    {
      text: "The website design exceeded all expectations. Not only is it visually stunning, but the user experience is seamless. Our bounce rate dropped by 35% and conversion rates increased significantly. Best investment we've made!",
      name: "Alexander Reed",
      title: "Digital Strategy Manager",
      company: "NextGen Solutions",
      avatar: "https://ui-avatars.com/api/?name=Alexander+Reed&background=094162&color=fff&size=128",
    },
  ];

  const professionalEndorsements = [
    {
      text: "I've had the privilege of witnessing remarkable growth and excellence in design work. The commitment to staying current with design trends while maintaining timeless principles is truly impressive. A true professional in every sense.",
      name: "Rachel Thompson",
      title: "Senior Design Director",
      company: "Creative Studio Pro",
      avatar: "https://ui-avatars.com/api/?name=Rachel+Thompson&background=094162&color=fff&size=128",
    },
    {
      text: "One of the most talented designers I've worked alongside. The ability to balance aesthetic beauty with functional design is extraordinary. Always brings fresh perspectives and innovative solutions to every project.",
      name: "Sophia Anderson",
      title: "Creative Lead",
      company: "Design Collective",
      avatar: "https://ui-avatars.com/api/?name=Sophia+Anderson&background=094162&color=fff&size=128",
    },
    {
      text: "It's been inspiring to see such dedication to craft and continuous improvement. The design work consistently demonstrates both technical excellence and artistic vision. A valuable asset to any project or team.",
      name: "James Mitchell",
      title: "Art Director",
      company: "Pixel Perfect Agency",
      avatar: "https://ui-avatars.com/api/?name=James+Mitchell&background=094162&color=fff&size=128",
    },
  ];

  const renderStars = () => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-xl" />
        ))}
      </div>
    );
  };

  return (
    <section id="feedback" className="min-h-screen py-28 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaQuoteLeft className="text-orange-500 text-5xl" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Valuable Feedbacks
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what clients and industry professionals have to say about our
            work and collaboration
          </p>
        </motion.div>

        {/* Client Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center justify-center mb-12">
            <div className="flex-1 h-px bg-blue-500"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 px-6">
              Client Reviews
            </h3>
            <div className="flex-1 h-px bg-blue-500"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {clientReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                {renderStars()}
                <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                  {review.text}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-600">
                      {review.title} at {review.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Endorsements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-12">
            <div className="flex-1 h-px bg-purple-500"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 px-6">
              Professional Endorsements
            </h3>
            <div className="flex-1 h-px bg-purple-500"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {professionalEndorsements.map((endorsement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                {renderStars()}
                <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                  {endorsement.text}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={endorsement.avatar}
                    alt={endorsement.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {endorsement.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {endorsement.title} at {endorsement.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeedbackSection;

