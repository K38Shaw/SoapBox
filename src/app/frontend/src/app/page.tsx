import styles from "./page.module.css";
import { WalletConnectionButton } from "./Components";

'use client';
import Image from "next/image";
import styles from "./page.module.css";
import ClosedCardView from "../components/closedCardView/ClosedCardView";
import LoginWithApple from "./components/LoginWithApple/page";
import LoginWithGoogle from "./components/LoginWithGoogle/page";
import UsernameField from "./components/UsernameField/page";
import PasswordField from "./components/PasswordField/page";
import ContinueButton from "./components/ContinueButton/page";
import MetaMaskButton from "./components/MetaMaskButton/page";

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
    <div className={styles.page}>
      <WalletConnectionButton/>
      <UsernameField />
      <PasswordField />
      <LoginWithApple />
      <LoginWithGoogle />
      <MetaMaskButton />
      <ContinueButton />
      
    </div>
  );
};

export default Page;
