import styles from "./TeamGrid.module.css";
import TeamCard from "../../components/TeamCard/TeamCard";

const TeamGrid = ({ members = [] }) => {
  return (
    <div className={styles.gridWrap}>
      <div className={styles.grid}>
        {members.map((m) => (
          <TeamCard key={m.id} member={m} />
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;
