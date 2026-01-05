import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeedbackSection = () => {
  const clientReviews = [
    {
      text: "Working with this designer was an absolute pleasure. The attention to detail and creative vision transformed our brand identity beyond our expectations. Every deliverable was on time and exceeded our quality standards. Highly recommended!",
      name: "Jennifer Martinez",
      title: "Chief Marketing Officer",
      company: "TechVision Global",
      avatar:
        "https://ui-avatars.com/api/?name=Jennifer+Martinez&background=094162&color=fff&size=128",
    },
    {
      text: "An exceptional designer with a unique ability to understand client needs and translate them into stunning visuals. The UI/UX work done for our mobile app resulted in a 70% increase in user engagement. Professional, creative, and reliable.",
      name: "Michael Chen",
      title: "Product Director",
      company: "InnovateLabs",
      avatar:
        "https://ui-avatars.com/api/?name=Michael+Chen&background=094162&color=fff&size=128",
    },
    {
      text: "The website design exceeded all expectations. Not only is it visually stunning, but the user experience is seamless. Our bounce rate dropped by 35% and conversion rates increased significantly. Best investment we've made!",
      name: "Alexander Reed",
      title: "Digital Strategy Manager",
      company: "NextGen Solutions",
      avatar:
        "https://ui-avatars.com/api/?name=Alexander+Reed&background=094162&color=fff&size=128",
    },
    {
      text: "Outstanding work on our packaging design! The creative solutions provided not only enhanced our product's appeal but also improved our market positioning. The designer's professionalism and creativity are unmatched.",
      name: "Sarah Johnson",
      title: "Brand Manager",
      company: "Premium Products Co.",
      avatar:
        "https://ui-avatars.com/api/?name=Sarah+Johnson&background=094162&color=fff&size=128",
    },
    {
      text: "The rebranding project was executed flawlessly. From initial concept to final implementation, every step was handled with expertise and care. Our brand now stands out in a crowded marketplace.",
      name: "David Williams",
      title: "CEO",
      company: "Startup Innovations",
      avatar:
        "https://ui-avatars.com/api/?name=David+Williams&background=094162&color=fff&size=128",
    },
    {
      text: "Exceptional service and results! The marketing materials created for our campaign were not only beautiful but also highly effective. We saw a significant increase in customer engagement and sales.",
      name: "Emily Brown",
      title: "Marketing Director",
      company: "Growth Solutions",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Brown&background=094162&color=fff&size=128",
    },
  ];

  const professionalEndorsements = [
    {
      text: "I've had the privilege of witnessing remarkable growth and excellence in design work. The commitment to staying current with design trends while maintaining timeless principles is truly impressive. A true professional in every sense.",
      name: "Rachel Thompson",
      title: "Senior Design Director",
      company: "Creative Studio Pro",
      avatar:
        "https://ui-avatars.com/api/?name=Rachel+Thompson&background=094162&color=fff&size=128",
    },
    {
      text: "One of the most talented designers I've worked alongside. The ability to balance aesthetic beauty with functional design is extraordinary. Always brings fresh perspectives and innovative solutions to every project.",
      name: "Sophia Anderson",
      title: "Creative Lead",
      company: "Design Collective",
      avatar:
        "https://ui-avatars.com/api/?name=Sophia+Anderson&background=094162&color=fff&size=128",
    },
    {
      text: "It's been inspiring to see such dedication to craft and continuous improvement. The design work consistently demonstrates both technical excellence and artistic vision. A valuable asset to any project or team.",
      name: "James Mitchell",
      title: "Art Director",
      company: "Pixel Perfect Agency",
      avatar:
        "https://ui-avatars.com/api/?name=James+Mitchell&background=094162&color=fff&size=128",
    },
    {
      text: "A master of visual storytelling. The ability to translate complex ideas into clear, compelling designs is remarkable. Every project showcases a deep understanding of both design principles and client needs.",
      name: "Olivia Davis",
      title: "Creative Director",
      company: "Visual Arts Studio",
      avatar:
        "https://ui-avatars.com/api/?name=Olivia+Davis&background=094162&color=fff&size=128",
    },
    {
      text: "Working with this designer has been an absolute delight. The attention to detail, creative problem-solving, and professional approach make them stand out in the industry. Highly recommend for any design project.",
      name: "Robert Taylor",
      title: "Design Lead",
      company: "Innovation Labs",
      avatar:
        "https://ui-avatars.com/api/?name=Robert+Taylor&background=094162&color=fff&size=128",
    },
    {
      text: "The design work speaks for itself - innovative, polished, and effective. This designer brings a unique perspective to every project and consistently delivers exceptional results that exceed expectations.",
      name: "Emma Wilson",
      title: "Senior Art Director",
      company: "Creative Minds Agency",
      avatar:
        "https://ui-avatars.com/api/?name=Emma+Wilson&background=094162&color=fff&size=128",
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
    <section
      id="feedback"
      className="min-h-screen py-28 px-4 bg-white overflow-visible w-full"
    >
      <div className="container mx-auto max-w-7xl overflow-visible w-full px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="relative w-full py-8 overflow-visible"
              style={{ isolation: "isolate" }}
            >
              <h2 className="hidden md:block text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-gray-200 absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-50 select-none pointer-events-none">
                Valuable Feedbacks
              </h2>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-gray-800 relative z-10 flex justify-center items-center gap-2"
              >
                <div className="flex items-center gap-2">
                  <FaQuoteLeft className="text-orange-500 text-5xl" />
                  <span>Valuable Feedbacks</span>
                </div>
              </motion.h2>
            </div>
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
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 px-6 text-center whitespace-nowrap">
              Client Reviews
            </h3>
            <div className="flex-1 h-px bg-blue-500"></div>
          </div>

          <div className="relative pb-16">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="client-reviews-swiper"
            >
              {clientReviews.map((review, index) => (
                <SwiperSlide key={index} className="h-auto">
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-orange-500 transition-colors flex flex-col h-full min-h-[320px] cursor-pointer">
                    {renderStars()}
                    <p className="text-sm text-gray-700 mb-6 leading-relaxed flex-1">
                      {review.text}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {review.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {review.title} at {review.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 px-6 text-center whitespace-nowrap">
              Professional Endorsements
            </h3>
            <div className="flex-1 h-px bg-purple-500"></div>
          </div>

          <div className="relative pb-16">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="endorsements-swiper"
            >
              {professionalEndorsements.map((endorsement, index) => (
                <SwiperSlide key={index} className="h-auto">
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-orange-500 transition-colors flex flex-col h-full min-h-[320px] cursor-pointer">
                    {renderStars()}
                    <p className="text-sm text-gray-700 mb-6 leading-relaxed flex-1">
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
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeedbackSection;
