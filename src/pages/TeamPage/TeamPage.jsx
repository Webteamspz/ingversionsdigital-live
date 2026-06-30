import { Suspense, lazy } from "react";
import styles from "./TeamPage.module.css";
import { teamPage as teamCopy, teamMembers } from "../../data/teamdata";
import TeamHero from "../../components/TeamHero/TeamHero";
import Layout from "../../Layouts/Layouts";

const TeamGrid = lazy(() => import("../../components/TeamGrid/TeamGrid"));

const TeamPage = () => {
  return (
    <>
      <Layout header={1} footer={1}>
        <main className={styles.teamPage}>
          <section className="container">
            <TeamHero
              eyebrow={teamCopy.hero.eyebrow}
              heading={teamCopy.hero.heading}
              pill={teamCopy.hero.pill}
              subtext={teamCopy.hero.subtext}
            />

            <Suspense fallback={null}>
              <TeamGrid members={teamMembers} />
            </Suspense>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default TeamPage;
