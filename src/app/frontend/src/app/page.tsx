import styles from "./page.module.css";
import { WalletConnectionButton } from "./Components";

'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { LoginWithApple } from "../components/LoginWithApple/LoginWithApple";
import { LoginWithGoogle } from "../components/LoginWithGoogle/LoginWithGoogle";
import { UsernameField } from "../components/UsernameField/UsernameField";
import { PasswordField } from "../components/PasswordField/PasswordField";
import { ContinueButton } from "../components/ContinueButton/ContinueButton";
import { MetaMaskButton } from "../components/MetaMaskButton/MetaMaskButton";

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
