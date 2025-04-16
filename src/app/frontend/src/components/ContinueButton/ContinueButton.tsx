import  styles from "./page.module.css";
import React from "react";
 
export const ContinueButton: React.FC = () => {

    return (
      <div>
        <button className={styles.button}>
        <span>CONTINUE</span>
        </button>
      </div>
    );
}
