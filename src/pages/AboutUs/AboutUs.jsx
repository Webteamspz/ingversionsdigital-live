import AboutHero from '../../components/AboutHero/AboutHero';
import AboutStory from '../../components/AboutStory/AboutStory';
import AboutExpertise from '../../components/AboutExpertise/AboutExpertise';
import AboutValues from '../../components/AboutValues/AboutValues';
import AboutCta from '../../components/AboutCta/AboutCta';
import styles from './AboutUs.module.css';
import Layout from '../../layouts/Layouts';
import SEO from '../../components/SEO/SEO';
import seo from '../../data/seodata';

const AboutUs = () => {
  return (
    <>
      <SEO {...seo.aboutUs} />
      <Layout header={1} footer={1}>
        <main className={styles.aboutPage}>
          <AboutHero />
          <AboutStory />
          <AboutExpertise />
          <AboutValues />
          <AboutCta />
        </main>
      </Layout>
    </>
  );
};

export default AboutUs;
