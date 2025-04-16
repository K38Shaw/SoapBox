import  styles from "./page.module.css";

export default function PasswordField() {
    return (
        <div>
            <input type="password" placeholder="Password" className={styles.textfield}/>
        </div>
    )
}