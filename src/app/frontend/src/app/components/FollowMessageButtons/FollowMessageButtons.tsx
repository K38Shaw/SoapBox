import styles from './FollowMessageButtons.module.css';

const FollowMessageButtons = () => {
  return (
    <div className={styles.container}>
      <button className={styles.followButton}>Follow</button>
      <button className={styles.messageButton}>Message</button>
    </div>
  );
};

export default FollowMessageButtons;
