import styles from './ProfileHeader.module.css';

interface ProfileHeaderProps {
  avatarUrl: string;
  username: string;
  alias: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatarUrl, username, alias }) => {
  const defaultAvatar = "/placeholder-avatar.jpg";
  return (
    <div className={styles.profileHeader}>
      <img 
        src={avatarUrl || defaultAvatar} 
        alt="User Avatar" 
        className={styles.avatar} 
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = defaultAvatar;
        }}
      />
      <h2 className={styles.username}>{username || "Xx_JackDon_xX"}</h2>
      <p className={styles.alias}>{alias || "@jackdon"}</p>
    </div>
  );
};

export default ProfileHeader;