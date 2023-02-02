import React from "react";
import styles from "./card.module.css";
function Card({ color }) {
  return (
    <div className={styles.card} style={{ backgroundColor: color }}>
      Note
    </div>
  );
}

export default Card;
