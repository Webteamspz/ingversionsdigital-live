import './AboutStory.css';
import { storyData, missionCards } from '../../data/aboutusdata';

const AboutStory = () => {
  return (
    <section className="aboutStory" id="aboutStory">
      <div className="container">
        <div className="aboutStoryGrid">
          <div className="aboutStoryText">
            <h2 className="sectionTitle">{storyData.title}</h2>
            {storyData.paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          <div className="aboutStoryVisual">
            <img
              src={storyData.imageSrc}
              alt={storyData.imageAlt}
              className="aboutStoryImg heroVisualImg"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="aboutMissionGrid">
          {missionCards.map((item) => (
            <div key={item.title} className="card aboutMissionCard">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
