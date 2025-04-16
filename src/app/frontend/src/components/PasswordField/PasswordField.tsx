import  styles from "./page.module.css";

export const PasswordField: React.FC = () => {
    return (
        <div>
            <input type="password" placeholder="Password" className={styles.textfield}/>
        </div>
    )
}