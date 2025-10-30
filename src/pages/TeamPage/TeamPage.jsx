import React, { useMemo, useState } from 'react';
import styles from './TeamPage.module.css';
import { teamPage as teamCopy, teamMembers } from '../../data/teamdata';
import TeamHero from '../../components/TeamHero/TeamHero';
import TeamFilters from '../../components/TeamFilters/TeamFilters';
import TeamGrid from '../../components/TeamGrid/TeamGrid';
import Layout from '../../Layouts/Layouts';

const TeamPage = () => {
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('All');
  const [role, setRole] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teamMembers.filter((m) => {
      const inDept = dept === 'All' || m.department === dept;
      const inRole = role === 'All' || m.title === role;
      const skills = Array.isArray(m.skills) ? m.skills : [];
      const inQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        skills.join(' ').toLowerCase().includes(q);
      return inDept && inRole && inQuery;
    });
  }, [query, dept, role]);

  return (
    <Layout header={1} footer={1}>
      <main className={styles.teamPage}>
        <section className="container">
          <TeamHero
            eyebrow={teamCopy.hero.eyebrow}
            heading={teamCopy.hero.heading}
            subtext={teamCopy.hero.subtext}
          />
          <TeamFilters
            placeholder={teamCopy.search.placeholder}
            query={query}
            setQuery={setQuery}
            departments={teamCopy.filters.departments}
            roles={teamCopy.filters.roles}
            dept={dept}
            setDept={setDept}
            role={role}
            setRole={setRole}
          />
          <TeamGrid members={filtered} />
        </section>
      </main>
    </Layout>
  );
};

export default TeamPage;
