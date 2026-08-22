import styles from './AboutStory.module.css';
import { storyData, missionCards } from '../../data/aboutusdata';
import Reveal from '../Reveal/Reveal';

const AboutStory = () => {
  return (
    <section className={styles.aboutStory} id="aboutStory">
      <div className="container">
        <Reveal className={styles.aboutStoryGrid}>
          <div className={styles.aboutStoryText}>
            <h2 className={styles.sectionTitle}>{storyData.title}</h2>
            {storyData.paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          <div className={styles.aboutStoryVisual}>
            <img
              src={storyData.imageSrc}
              alt={storyData.imageAlt}
              className={styles.aboutStoryImg}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        <div className={styles.aboutMissionGrid}>
          {missionCards.map((item, i) => (
            <Reveal key={item.title} delay={i * 80} className={`card ${styles.aboutMissionCard}`}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
