import styles from "./TeamGrid.module.css";
import TeamCard from "../../components/TeamCard/TeamCard";
import Reveal from "../Reveal/Reveal";

const TeamGrid = ({ members = [] }) => {
  return (
    <div className={styles.gridWrap}>
      <div className={styles.grid}>
        {members.map((m, i) => (
          <Reveal key={m.id} delay={(i % 4) * 80}>
            <TeamCard member={m} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;
