import styles from "./TeamPage.module.css";
import { teamPage as teamCopy, teamMembers } from "../../data/teamdata";
import TeamHero from "../../components/TeamHero/TeamHero";
import TeamGrid from "../../components/TeamGrid/TeamGrid";
import Layout from "../../Layouts/Layouts";

const TeamPage = () => {
  return (
    <Layout header={1} footer={1}>
      <main className={styles.teamPage}>
        <section className="container">
          <TeamHero
            eyebrow={teamCopy.hero.eyebrow}
            heading={teamCopy.hero.heading}
            subtext={teamCopy.hero.subtext}
          />
          <TeamGrid members={teamMembers} />
        </section>
      </main>
    </Layout>
  );
};

export default TeamPage;
