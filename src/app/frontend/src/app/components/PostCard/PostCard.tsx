import styles from "./PostCard.module.css";

interface PostCardProps {
  topic: string;
  body: string;
  imageUrl?: string;
  onViewFull: () => void;
}

export default function PostCard({ topic, body, imageUrl, onViewFull }: PostCardProps) {
  return (
    <div className={styles.postCard} onClick={onViewFull}>
      <div className={styles.textContent}>
        <div className={styles.topic}>Topic: {topic}</div>
        <div className={styles.body}>{body}</div>
      </div>
      {imageUrl && (
        <img src={imageUrl} alt="Post" className={styles.image} />
      )}
    </div>
  );
}
