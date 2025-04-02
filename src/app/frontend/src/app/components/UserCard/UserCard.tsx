import Link from "next/link";
import styles from './UserCard.module.css';  // Import the CSS Module

export type UserCardProps = {
  username: string;
  userId?: string;
};

const UserCard: React.FC<UserCardProps> = ({ username, userId }) => {
  return (
    <div className={styles.card}>
      <p className={styles.username}>
        <Link href={`/Profile`} className={styles.username}>
          {username}
        </Link>
      </p>
    </div>
  );
};

export default UserCard;
