import style from "./page.module.css";
import Image from "next/image";

export const MetaMaskButton: React.FC = () => {
    return ( 
    <div>
        <button className={style.button}>
        <Image className={style.icon} src="/metamask-logo.svg" alt="metamask logo" width={23} height={23} />
        Sign In With MetaMask
        </button>
    </div>
    );
}