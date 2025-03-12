"use client";


import React, { useState } from "react";
import "./ClosedCardView.css";
import { FaThumbsUp, FaThumbsDown, FaComment, FaBookmark } from "react-icons/fa";



type ClosedCardViewProps = {
 postId: string;
 avatar: string;
 username: string;
 title: string;
 content: string;
 initialLikes: number;
 initialDislikes: number;
 userReaction?: "like" | "dislike" | null;
};


const ClosedCardView: React.FC<ClosedCardViewProps> = ({
 postId,
 avatar,
 username,
 title,
 content,
 initialLikes,
 initialDislikes,
 userReaction = null,
}) => {
 const [likes, setLikes] = useState(initialLikes);
 const [dislikes, setDislikes] = useState(initialDislikes);
 const [userLiked, setUserLiked] = useState(userReaction);


 const handleLike = () => {
   if (userLiked === "like") {
     setLikes(likes - 1);
     setUserLiked(null);
   } else {
     setLikes(likes + 1);
     if (userLiked === "dislike") setDislikes(dislikes - 1);
     setUserLiked("like");
   }
 };


 const handleDislike = () => {
   if (userLiked === "dislike") {
     setDislikes(dislikes - 1);
     setUserLiked(null);
   } else {
     setDislikes(dislikes + 1);
     if (userLiked === "like") setLikes(likes - 1);
     setUserLiked("dislike");
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
       <button className={`like-button ${userLiked === "like" ? "active" : ""}`} onClick={handleLike}>
         <FaThumbsUp /> <span>{likes}</span>
       </button>
       <button className={`dislike-button ${userLiked === "dislike" ? "active" : ""}`} onClick={handleDislike}>
         <FaThumbsDown /> <span>{dislikes}</span>
       </button>
       <button className="comment-button">
         <FaComment />
       </button>
       <button className="bookmark-button">
         <FaBookmark />
       </button>
     </div>


     <div className="post-comment">
       <p>Comments:</p>
       <input type="text" placeholder="Write a comment..." className="comment-input" />
     </div>
   </div>
 );
};


export default ClosedCardView;
export type { ClosedCardViewProps };
