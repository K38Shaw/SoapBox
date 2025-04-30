import { useState } from "react";
import styles from "./CreatePostForm.module.css";

interface CreatePostFormProps {
  onCreate: (newPost: { topic: string; body: string; imageUrl?: string }) => void;
}

export default function CreatePostForm({ onCreate }: CreatePostFormProps) {
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !body.trim()) return;

    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : undefined;
    onCreate({ topic, body, imageUrl });

    setTopic("");
    setBody("");
    setImageFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Create a Post</h2>
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        required
      />
      <textarea
        placeholder="What's on your mind?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />
      <button type="submit">Post</button>
    </form>
  );
}