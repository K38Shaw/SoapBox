import styles from "./page.module.css";
import { WalletConnectionButton } from "./Components";

'use client';
import Image from "next/image";
import styles from "./page.module.css";
import LoginWithApple from "./components/LoginWithApple/page";
import LoginWithGoogle from "./components/LoginWithGoogle/page";
import UsernameField from "./components/UsernameField/page";
import PasswordField from "./components/PasswordField/page";
import ContinueButton from "./components/ContinueButton/page";
import MetaMaskButton from "./components/MetaMaskButton/page";

export default function Home() {
  return (
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
}
