import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ratch from "../img/Ratsch.png";
import kannamma from "../img/Kannamma.png";
import smartPro from "../img/Smartpro.png";
import gnanam from "../img/gnanam.png";
import thankamma from "../img/thankamma.png";
import agriwealth from "../img/agriwealth.png";
import aia from "../img/aia.jpg";
import sajanth from "../img/sajanth.png";
import sjm from "../img/sjm.png";
import ads from "../img/ads.png";
import angelsTouch from "../img/angelsTouch.png";
import trioTreats from "../img/trioTreats.png";
import towshi from "../img/towshi.png";

const FeedbackSection = () => {
  const clientReviews = [
    {
      text: "Had a great time working with TD Creative (Pvt) Ltd on the logo design for our Ratsch Productions! Loved the clean design, strong branding, and super professional approach. Truly happy with the result—wishing you lots more success ahead!",
      name: "Ratsch Productions",
      avatar: ratch,
    },
    {
      text: "A huge thank you to TD Creative Pvt (Ltd) for designing my beautiful logo! 🎨✨ Your creativity and effort truly brought Kilinochchi Kannamma to life! ❤️",
      name: "Kilinochchi Kannama",
      avatar: kannamma,
    },
    {
      text: "Thank you TD Creative for your impressive work. It was highly professional, creative and attentive to my ideas. The final design exceeded my expectations. I express my heartfelt appreciation. 😍Congratulations for your growth!💐 I highly recommend their services to anyone looking for high-quality, thoughtful graphic design.😎",
      name: "SmartPro English Academy",
      avatar: smartPro,
    },
    {
      text: "Congratulations TD creative! You are an excellent and exemplary designer.. You have captured the ideas perfectly in just one visit and registered the logo for the company. Giving the expected color and shape to the customer on time is an excellent act. We wish your company further growth.",
      name: "Gnanam's Group of Company",
      avatar: gnanam,
    },
    {
      text: "எனது நிறுவனத்திற்கான Logo Design மற்றும் Light Board மிகவும் அழகாக, தரமாக, கவனத்தை ஈர்க்கும் வகையில் உருவாக்கி அளித்த TD Creative நிறுவனத்திற்கு மனமார்ந்த நன்றியைத் தெரிவித்துக் கொள்கிறேன்.உங்கள் கலை நுணுக்கமும் தொழில்முறை அணுகுமுறையும் எனது Thankamma Automobile முன்னேற்றத்தில் முக்கிய பங்கு வகிக்கிறது. மீண்டும் ஒருமுறை, உங்கள் உழைப்புக்கும் ஆதரவுக்கும் என் இதயப்பூர்வ நன்றி!",
      name: "Thankamma Automobile ",
      avatar: thankamma,
    },
    {
      text: "மிக எளிமையாக வளர்ந்து வரும் வடமாகாணத்தின் ஆளுமை, நேர்த்தியானவேலை, நேரமுகாமை, நெகிழ்ச்சியான நபர். நம்பிப்போகலாம், வாழ்த்துக்கள் சகோ. A simple and steadily rising personality from the Northern Province —a dedicated worker, punctual, and a pleasant person. Truly dependable. Congratulations, brother.",
      name: "Agri Wealth",
      avatar: agriwealth,
    },
    {
      text: "Friendly, elegant, timeless, amazing, unique, innovative design that accurately reflects our thoughts. I will always recommend it to everyone without hesitation.",
      name: "AIA",
      avatar: aia,
    },
    {
      text: "Really satisfied🤗 with the work and did a great job🔥. They patiently did all  the requirements I have asked Thanks For You TD Creative 💥💫",
      name: "Sajanth Sales",
      avatar: sajanth,
    },
    {
      text: "Thank you for your valuable work   TD Creative ✨️.  Your design  exceeded our expectations and we love it. We appreciate your creativity and timely delivery.",
      name: "SJM Engineering & Construction",
      avatar: sjm,
    },
    {
      text: "Kudos to TD Creative Graphics Design & Solution for delivering a masterpiece of innovation with the logo for Ads Buddy International! Your talent in transforming ideas into a striking visual identity is truly unparalleled. May your creative brilliance continue to inspire, disrupt, and redefine the art of design!. A Massive Thanks to TD Creative @Danujan! 🤗😍. I am big fan of your phenomenal work, machchi! 🔥🖤",
      name: "Ads Buddy International",
      avatar: ads,
    },
    {
      text: "Thankyou for your amazing work danujan 😍😍 I'm very satisfied with your work",
      name: "Angel's Touch",
      avatar: angelsTouch,
    },
    {
      text: "I truly appreciate TD Creative for their exceptional work! Their professionalism, creativity, and remarkable patience throughout the entire process made the experience truly enjoyable. They carefully understood all my requirements and delivered exactly what I envisioned even better than I expected ❤️. Your designs beautifully reflect both quality and dedication. I sincerely appreciate your effort and commitment. Wishing you continued success and many more creative achievements ahead!. Highly recommended for anyone looking for reliable and innovative design services.",
      name: "Trio Treats",
      avatar: trioTreats,
    },
    {
      text: "I recommended  @TD Creactive And @Danujandaniel. He took short time to creation of this logo And Board designs. I'm very Impressive this logo. I did not  give Eny ideas to him .  but He make this designs very Elegant.  Thank you Thampi Danujan",
      name: "Lowshi Total Care & Academy",
      avatar: towshi,
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
      className="min-h-screen py-28 px-4 bg-white overflow-x-hidden w-full"
    >
      <div className="container mx-auto max-w-7xl overflow-x-hidden w-full px-4">
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
              <h2 className="hidden md:block text-4xl md:text-6xl lg:text-8xl xl:text-[106px] font-bold text-gray-200 absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-50 select-none pointer-events-none">
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
                <SwiperSlide key={index} className="h-auto select-none">
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-orange-500 transition-colors flex flex-col h-full min-h-[320px] cursor-pointer">
                    {renderStars()}
                    <p className="text-sm text-gray-700 mb-6 leading-relaxed flex-1">
                      {review.text}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {review.name}
                        </h4>
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
