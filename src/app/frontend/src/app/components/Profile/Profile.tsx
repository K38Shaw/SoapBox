import { useState } from "react";
import BottomNav from "../BottomNav/BottomNav";
import Search from "../Search/Search";
import CreatePostForm from "../CreatePostForm/CreatPostForm";
import styles from "./Profile.module.css";
import PostCard from "../PostCard/PostCard";
import FullPostView from "../FullPostView/FullPostView";

interface Post {
  id: number;
  topic: string;
  body: string;
  imageUrl?: string;
}

export default function Profile() {
  const [view, setView] = useState<"profile" | "search" | "create">("profile");
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleCreate = (newPost: { topic: string; body: string; imageUrl?: string }) => {
    const postWithId = { ...newPost, id: Date.now() };
    setPosts([postWithId, ...posts]);
    setView("profile");
  };

  return (
    <div className={styles.profileContainer}>
      {view === "search" && <Search />}

      {view === "create" && <CreatePostForm onCreate={handleCreate} />}

      {view === "profile" && !selectedPost && (
        <div>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}></div>
            <div className={styles.username}>Xx_JackDon_xX</div>
            <div className={styles.title}>Xx_JackDon’s_xX Posts</div>
          </div>
          <div className={styles.postsContainer}>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                topic={post.topic}
                body={post.body}
                imageUrl={post.imageUrl || ""}
                onViewFull={() => setSelectedPost(post)}
              />
            ))}
          </div>
        </div>
      )}

      {selectedPost && (
        <FullPostView post={selectedPost} onBack={() => setSelectedPost(null)} />
      )}

      <BottomNav
        onCreatePost={() => setView("create")}
        onProfile={() => setView("profile")}
        onSearch={() => setView("search")}
      />
    </div>
  );
}
