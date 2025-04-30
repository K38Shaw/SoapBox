import styles from './FullPostView.module.css';

interface FullPostViewProps {
  post: {
    id: number;
    topic: string;
    body: string;
    imageUrl?: string;
  };
  onBack: () => void;
}

export default function FullPostView({ post, onBack }: FullPostViewProps) {
  return (
    <div className={styles.fullPostContainer}>
      <button onClick={onBack}>← Back</button>
      <div className={styles.topic}>Topic: {post.topic}</div>
      <div className={styles.body}>{post.body}</div>
      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post image" className={styles.image} />
      )}
    </div>
  );
}
