import  styles from "./page.module.css";
import Image from "next/image";

export default function LoginWithApple() {
    return ( 
    <div>
        <button className={styles.button}>
        <Image className={styles.icon} src="/apple-logo-black.svg" alt="apple" width={23} height={23} />
        Sign In With Apple
        </button>
    </div>
    );
}