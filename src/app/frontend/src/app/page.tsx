"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ClosedCardView from "../components/closedCardView/ClosedCardView";

const Page = () => {
  return (
    <div>
    <ClosedCardView
  postId="123"
  avatar="https://via.placeholder.com/40"
  username="Xx_John_Doe_xX"
  title="Why are penguins a thing?"
  content="Blah blah blah..."
  initialLikes={0}
  initialDislikes={0}
  userReaction={null as "like" | "dislike" | null}
/>
</div>
  );
};

export default Page;
