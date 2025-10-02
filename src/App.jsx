import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import TrackRecord from "./components/track-record/track-record";
import Services from "./components/services/services";
import WorkProcess from "./components/work-process/work-process";
import WhyChooseUs from "./components/why-choose-us/why-choose-us";
import WhyWeStarted from "./components/why-we-started/why-we-started";
import Contact from "./components/contact/contact";
import FAQ from "./components/faq/faq";
import Footer from "./components/footer/footer";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <TrackRecord />
      <Services />
      <WorkProcess />
      <WhyChooseUs />
      <WhyWeStarted />
      <Contact />
      <FAQ />
      <Footer />
    </>
  );
}
