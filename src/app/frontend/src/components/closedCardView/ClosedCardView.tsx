"use client"; 

import React, { useState } from "react";
import "./ClosedCardView.css";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

type ClosedCardViewProps = {
  postId: string;
  avatar: string;
  username: string;
  title: string;
  content: string;
  initialLikes: number;
  initialDislikes: number;
  userReaction: "like" | "dislike" | null;
};

const ClosedCardView: React.FC<ClosedCardViewProps> = ({
  postId,
  avatar,
  username,
  title,
  content,
  initialLikes,
  initialDislikes,
  userReaction,
}) => {
  const [likes, setLikes] = useState(initialLikes); 
const [dislikes, setDislikes] = useState(initialDislikes); 
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(userReaction);

  const handleLike = () => {
    if (reaction === "like") {
      setLikes(likes - 1);
      setReaction(null);
    } else {
      setLikes(likes + 1);
      if (reaction === "dislike") setDislikes(dislikes - 1);
      setReaction("like");
    }
  };

  const handleDislike = () => {
    if (reaction === "dislike") {
      setDislikes(dislikes - 1);
      setReaction(null);
    } else {
      setDislikes(dislikes + 1);
      if (reaction === "like") setLikes(likes - 1);
      setReaction("dislike");
    }
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <img src={avatar} alt={username} className="post-avatar" />
        <div className="post-user-info">
          <span className="post-username">{username}</span>
        </div>
      </div>
      <div className="post-body">
        <h2 className="post-title">{title}</h2>
        <p className="post-content">{content.slice(0, 100)}...</p>
        <button className="expand-button">Read More</button>
      </div>
      <div className="post-actions">
        <button className={`like-button ${reaction === "like" ? "active" : ""}`} onClick={handleLike}>
          <FaThumbsUp /> {likes}
        </button>
        <button className={`dislike-button ${reaction === "dislike" ? "active" : ""}`} onClick={handleDislike}>
          <FaThumbsDown /> {dislikes}
        </button>
      </div>
      <div className="post-comment">
        <label htmlFor="comment" className="comment-label">Comments:</label>
        <input type="text" id="comment" placeholder="Write a comment..." className="comment-input" />
      </div>
    </div>
  );
};

export default ClosedCardView;
