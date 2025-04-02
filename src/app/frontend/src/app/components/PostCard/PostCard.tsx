import styles from './PostCard.module.css';

interface PostCardProps {
  topic: string;
  body:string;
  imageUrl: string;
}

const PostCard: React.FC<PostCardProps> = ({ topic,body, imageUrl }) => {
  return (
    <div className={styles.card}>
      {/* Left: Topic Section */}
      <div className={styles.topic}>{topic}
         <div className={styles.body}>{body}</div>
         </div>

      {/* Right: Image Section */}
      <div className={styles.media}>
        <img src={imageUrl} alt="Post Image" />
      </div>
    </div>
  );
};

export default PostCard;
