import Image from "next/image";
import styles from "./page.module.css";
import { WalletConnectionButton } from "./Components";

export default function Home() {
  return (
    <div className={styles.page}>
      <WalletConnectionButton/>
    </div>
  );
}
