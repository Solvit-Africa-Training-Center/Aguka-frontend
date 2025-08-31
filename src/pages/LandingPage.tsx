import About from "@components/About";
import AgukaJourney from "@components/AgukaJourney";
import Footer from "@components/Footer";
import Hero from "@components/Hero";
import KeyMetrics from "@components/KeyMetric";
import NavBar from "@components/NavBar";

const LandingPage: React.FC = () => {
  return (
    <div
      className="bg-[rgba(0,59,66,0.7)]">
      <NavBar />
      <Hero />
      <KeyMetrics />
      <About />
      <AgukaJourney />
      <Footer />
    </div>
  );
};

export default LandingPage;
