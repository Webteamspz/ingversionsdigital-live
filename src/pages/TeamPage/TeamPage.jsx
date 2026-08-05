import { Suspense, lazy, useState, useEffect } from "react";
import styles from "./TeamPage.module.css";
import { teamPage as teamCopy, teamMembers } from "../../data/teamdata";
import TeamHero from "../../components/TeamHero/TeamHero";
import Layout from "../../Layouts/Layouts";
import Preloader from "../../components/preloader/preloader";
import Seo from "../../components/Seo/Seo";

const TeamGrid = lazy(() => import("../../components/TeamGrid/TeamGrid"));

const TeamPage = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Seo
        title="Our Team | Ingversions Digital"
        description="Meet the team behind Ingversions Digital's Shopify CRO and conversion optimization work."
        path="/teampage"
      />

      {/* {showPreloader && (
        <Preloader
          minDuration={1500}
          logoSrc={"/assets/preloader/preloader.png"}
        />
      )} */}

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