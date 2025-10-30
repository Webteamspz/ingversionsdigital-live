import Slider from 'react-slick';
import styles from './TeamGrid.module.css';
import TeamCard from '../../components/TeamCard/TeamCard';

const TeamGrid = ({ members = [], useSlider = true }) => {
  if (!members?.length) {
    return (
      <div className={styles.gridWrap}>
        <div className={styles.emptyState}>
          No matching team members. Try clearing filters.
        </div>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true } },
      { breakpoint: 992,  settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 767,  settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
    ],
  };

  return (
    <div className={styles.gridWrap}>
      {useSlider ? (
        <div className={styles.sliderWrap}>
          <Slider {...settings}>
            {members.map((m) => (
              <div key={m.id} className={styles.slideCol}>
                <TeamCard member={m} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div
          className={styles.grid}
          style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))' }}
        >
          {members.map((m) => (
            <TeamCard key={m.id} member={m} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamGrid;
