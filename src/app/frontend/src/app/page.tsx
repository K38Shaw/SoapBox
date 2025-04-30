'use client'

"use client";

import { useState } from "react";
import BottomNav from "./components/BottomNav/BottomNav";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";
import CreatePostForm from "./components/CreatePostForm/CreatPostForm";
import FullPostView from "./components/FullPostView/FullPostView";
import PostCard from "./components/PostCard/PostCard";
import styles from "./page.module.css";

interface Post {
  id: number;
  topic: string;
  body: string;
  imageUrl?: string;
}

export default function Home() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleViewFull = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCreatePost = (newPost: Omit<Post, "id">) => {
    const postWithId = {
      ...newPost,
      id: Date.now(),
    };
    setPosts([postWithId, ...posts]);
  };

  return (
    <div
      className={styles.page}
      style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}
    >
      {!selectedPost ? (
        <>
          <Profile />
          <CreatePostForm onCreate={handleCreatePost} />
          <div className={styles.postsContainer}>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                topic={post.topic}
                body={post.body}
                imageUrl={post.imageUrl || ""}
                onViewFull={() => handleViewFull(post)}
              />
            ))}
          </div>
        </>
      ) : (
        <FullPostView post={selectedPost} onBack={() => setSelectedPost(null)} />
      )}

      <BottomNav
        onCreatePost={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onProfile={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onSearch={() => alert("Search disabled in profile-only mode.")}
      />
    </div>
  );
}

