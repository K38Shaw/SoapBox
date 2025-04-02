import styles from './ProfileHeader.module.css';

interface ProfileHeaderProps {
  avatarUrl: string;
  username: string;
  alias: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatarUrl, username, alias }) => {
  return (
    <div className={styles.profileHeader}>
      <img src={avatarUrl} alt="User Avatar" className={styles.avatar} />
      <h2 className={styles.username}>{username}</h2>
      <p className={styles.alias}>{alias}</p>
    </div>
  );
};

export default ProfileHeader;
