import { useState } from "react";
import styles from "./BottomNav.module.css";
import { FaSearch, FaPlus, FaUser } from "react-icons/fa";

const BottomNav = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={styles.bottomNav}>
      <div className={styles.searchContainer}>
        {showSearch ? (
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={() => setShowSearch(false)} // Hide when unfocused
          />
        ) : (
          <FaSearch className={styles.navIcon} onClick={() => setShowSearch(true)} />
        )}
      </div>
      <FaPlus className={styles.navIcon} />
      <FaUser className={styles.navIcon} />
    </div>
  );
};

export default BottomNav;
