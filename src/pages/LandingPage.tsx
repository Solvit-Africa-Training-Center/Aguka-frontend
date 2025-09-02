import About from "@components/About";
import AgukaJourney from "@components/AgukaJourney";
import Footer from "@components/Footer";
import Hero from "@components/Hero";
import KeyMetrics from "@components/KeyMetric";
import NavBar from "@components/NavBar";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#003B42B2] ">
      <NavBar />
      <Hero />
      <KeyMetrics />
      <section id="about">
        <About />
      </section>

      <AgukaJourney />
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
