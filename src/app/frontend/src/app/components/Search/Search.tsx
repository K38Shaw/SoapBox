import { useState } from "react";
import styles from "./Search.module.css";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.searchTitle}>Search</h2>
      <input
        type="text"
        placeholder="Search posts or users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.resultsTitle}>Search results for: {query}</div>
    </div>
  );
}
