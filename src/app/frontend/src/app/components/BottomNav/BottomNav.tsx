import styles from "./BottomNav.module.css";
import { FaSearch, FaPlus, FaUser } from "react-icons/fa";

interface BottomNavProps {
  onCreatePost: () => void;
  onProfile: () => void;
  onSearch: () => void;
}

export default function BottomNav({ onCreatePost, onProfile, onSearch }: BottomNavProps) {
  return (
    <div className={styles.navbar}>
      <button onClick={onSearch}><FaSearch /></button>
      <button onClick={onCreatePost}><FaPlus /></button>
      <button onClick={onProfile}><FaUser /></button>
    </div>
  );
}
