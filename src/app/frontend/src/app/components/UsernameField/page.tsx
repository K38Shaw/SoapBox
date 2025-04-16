import  styles from "./page.module.css";

export default function LoginField() {
    return (
        <div>
            <input type="text" placeholder="Username or Email" className={styles.textfield}/>
        </div>
    )
}