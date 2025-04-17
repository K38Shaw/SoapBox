import  styles from "./page.module.css";
import Image from "next/image";

export default function LoginWithGoogle() {
    return ( 
    <div>
        <button className={styles.button}>
        <Image className={styles.icon} src="/google-logo.svg" alt="google logo" width={23} height={23} />
        Sign In With Google
        </button>
    </div>
    );
}