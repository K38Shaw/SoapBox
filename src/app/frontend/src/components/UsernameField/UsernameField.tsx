import  styles from "./page.module.css";

export const UsernameField: React.FC = () => {
    return (
        <div>
            <input type="text" placeholder="Username or Email" className={styles.textfield}/>
        </div>
    )
}