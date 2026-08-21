import { Suspense, lazy } from "react";
import styles from "./TeamPage.module.css";
import { teamPage as teamCopy, teamMembers } from "../../data/teamdata";
import TeamHero from "../../components/TeamHero/TeamHero";
import Layout from "../../layouts/Layouts";
import SEO from "../../components/SEO/SEO";

const TeamGrid = lazy(() => import("../../components/TeamGrid/TeamGrid"));

const TeamPage = () => {
  return (
    <>
      <SEO
        title="Our Team | Ingversions Digital"
        description="Meet the team behind Ingversions Digital's Shopify CRO and conversion optimization work."
        path="/teampage"
      />

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
