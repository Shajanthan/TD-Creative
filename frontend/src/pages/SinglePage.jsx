import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import FeedbackSection from "../components/FeedbackSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const SinglePage = () => {
  return (
    <div className="min-h-screen w-full">
      <HomeSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <FeedbackSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default SinglePage;
