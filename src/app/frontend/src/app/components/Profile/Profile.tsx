import ProfileHeader from "../ProfileHeader/ProfileHeader";
import UserPosts from "../UserPosts/UserPosts";
import BottomNav from "../BottomNav/BottomNav";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.container}>
    

      {/* Profile Header */}
      <div className={styles.section}>
        
        <div className={styles.nameAndAvatar}>
        <ProfileHeader avatarUrl={""} username={""} alias={""} />
        <h3>xxx JohnDoe xxx</h3>
        </div>
        <h2>Your Posts</h2>
      </div>


      {/* User Posts Section */}
      <div className={styles.section2}>
        <UserPosts />
      </div>

    
        <BottomNav />
      
    </div>
  );
};

export default Profile;
