import { Suspense, lazy } from "react";
import styles from "./TeamPage.module.css";
import { teamPage as teamCopy, teamMembers } from "../../data/teamData";
import TeamHero from "../../components/TeamHero/TeamHero";
import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seoData";

const TeamGrid = lazy(() => import("../../components/TeamGrid/TeamGrid"));

const TeamPage = () => {
  return (
    <>
      <SEO {...seo.team} />

      <Layout header={1} footer={1}>
        <main className={styles.teamPage}>
          <TeamHero
            eyebrow={teamCopy.hero.eyebrow}
            heading={teamCopy.hero.heading}
            pill={teamCopy.hero.pill}
            subtext={teamCopy.hero.subtext}
          />

          <section className="container">
            <Suspense fallback={null}>
              <TeamGrid members={teamMembers} />
            </Suspense>

            <div className={styles.culture}>
              <h2>{teamCopy.culture.heading}</h2>
              {teamCopy.culture.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default TeamPage;
