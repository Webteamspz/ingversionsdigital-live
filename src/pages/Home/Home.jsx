import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import TrackRecord from "../../components/TrackRecord/TrackRecord";
import Services from "../../components/Services/Services";
import WorkProcess from "../../components/WorkProcess/WorkProcess";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Reviews from "../../components/Reviews/Reviews";
import Contact from "../../components/Contact/Contact";
import FAQ from "../../components/FAQ/FAQ";
import Preloader from "../../components/Preloader/Preloader";
import Team from "../../components/Team/Team";
import PricingCompare from "../../components/Pricing/Pricing";
import Layout from "../../Layouts/Layouts";

export default function Home() {
  return (
    <>
      <Preloader
        minDuration={1200}
        logoSrc={"/assets/preloader/preloader.png"}
      />
      <Header />
      <Hero />
      <TrackRecord />
      <Services />
      <WorkProcess />
      <PricingCompare />
      <WhyChooseUs />
      <Reviews />
      <Team />
      <Contact />
      <FAQ />
      <Layout />
    </>
  );
}
