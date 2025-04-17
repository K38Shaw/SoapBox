import style from "./page.module.css";
import Image from "next/image";

export default function MetaMaskButton() {
    return ( 
    <div>
        <button className={style.button}>
        <Image className={style.icon} src="/metamask-logo.svg" alt="metamask logo" width={23} height={23} />
        Sign In With MetaMask
        </button>
    </div>
    );
}