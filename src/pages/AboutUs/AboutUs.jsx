import React from 'react';
import AboutHero from '../../components/AboutHero/AboutHero';
import AboutStory from '../../components/AboutStory/AboutStory';
import AboutExpertise from '../../components/AboutExpertise/AboutExpertise';
import AboutTrack from '../../components/AboutTrack/AboutTrack';
import AboutValues from '../../components/AboutValues/AboutValues';
import AboutCta from '../../components/AboutCta/AboutCta';
import './AboutUs.css';
import Layout from '../../Layouts/Layouts';
import Seo from '../../components/Seo/Seo';

const AboutUs = () => {
  return (
    <>
      <Seo
        title="About Us | Ingversions Digital"
        description="Ingversions Digital is a Shopify CRO agency serving ecommerce brands worldwide, based in Surat, India."
        path="/about-us"
      />
      <Layout header={1} footer={1}>
        <main className="aboutPage">
          <AboutHero />
          <AboutStory />
          <AboutExpertise />
          <AboutTrack />
          <AboutValues />
          <AboutCta />
        </main>
      </Layout>
    </>
  );
};

export default AboutUs;