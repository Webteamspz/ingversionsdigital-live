import styles from "./TeamFilters.module.css";

const TeamFilters = ({
  placeholder,
  query,
  setQuery,
  departments,
  roles,
  dept,
  setDept,
  role,
  setRole,
}) => {
  const onSubmit = (e) => e.preventDefault();

  return (
    <form className={styles.filtersWrap} onSubmit={onSubmit}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search team"
        />
        <button className="btn" type="submit">
          Search
        </button>
      </div>

      <div className={styles.selectRow}>
        <label className={styles.selectLabel}>
          <span>Department</span>
          <select
            className={styles.selectControl}
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.selectLabel}>
          <span>Role</span>
          <select
            className={styles.selectControl}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>
    </form>
  );
};

export default TeamFilters;
