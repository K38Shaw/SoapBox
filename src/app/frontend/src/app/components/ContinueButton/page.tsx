import  styles from "./page.module.css";
import Image from "next/image";

export default function ContinueButton() {
    return ( 
    <div>
        <button className={styles.button}>
       <span>CONTINUE</span>
        </button>
    </div>
    );
}