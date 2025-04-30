// UserPosts.tsx
import { useState } from 'react';
import styles from './UserPosts.module.css';
import PostCard from '../PostCard/PostCard';
import FullPostView from '../FullPostView/FullPostView';

interface Post {
  id: number;
  topic: string;
  body: string;
  imageUrl: string;
  videoUrl?: string;
}

const initialPosts: Post[] = [
  {
    id: 1,
    topic: "Topic:",
    body: "Just discovered an amazing new coffee shop downtown. Their cold brew is literally life-changing! Anyone else tried specialty coffee recently?",
    imageUrl: "/Bannana.jpeg",
  },
  {
    id: 2,
    topic: "Topic:",
    body: "Working on a new side project using React and TypeScript. The type safety is so worth the extra effort. What tech stack are you all using these days?",
    imageUrl: "/Bannana.jpeg",
  },
  {
    id: 3,
    topic: "Topic:",
    body: "Finally got tickets to that concert I've been waiting for all year! Who else is going to be at Madison Square Garden next week?",
    imageUrl: "/Bannana.jpeg",
  },
];

export default function UserPosts() {
  const [posts] = useState<Post[]>(initialPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (selectedPost) {
    return <FullPostView post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className={styles.postsContainer}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          topic={post.topic}
          body={post.body}
          imageUrl={post.imageUrl}
          onViewFull={() => setSelectedPost(post)}
        />
      ))}
    </div>
  );
}
