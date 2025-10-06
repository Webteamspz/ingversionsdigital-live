import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import TrackRecord from "./components/TrackRecord/TrackRecord";
import Services from "./components/Services/Services";
import WorkProcess from "./components/WorkProcess/WorkProcess";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import WhyWeStarted from "./components/WhyWeStarted/WhyWeStarted";
import Contact from "./components/Contact/Contact";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import Preloader from "./components/Preloader/Preloader";
import PricingTable from "./components/Pricing/Pricing";
import Team from "./components/Team/Team";


export default function App() {
  return (
    <>
        <Preloader
        minDuration={1300}
        logoSrc={"/assets/preloader/preloader.png"}   
      />
      <Header />
      <Hero />
      <TrackRecord />
      <Services />
      <WorkProcess />
      <WhyChooseUs />
      <WhyWeStarted />
      <Contact />
      <FAQ />
      <PricingTable />
      <Team />
      <Footer />
    </>
  );
}