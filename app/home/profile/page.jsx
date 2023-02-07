import React from "react";
import styles from "./profile.module.css";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });
function page() {
  return (
    <div className={styles.profile}>
      <header>
        <h1 className={inter.className}>Profile</h1>
      </header>

      <div className={styles.other}>
        <div className={styles.label}>
          <div className={styles.card}>
            <h1 className={inter.className}>21</h1>
          </div>
          <h3 className={inter.className}>total notes</h3>
        </div>
        <div className={styles.label}>
          <div className={styles.card}></div>
          <h3 className={inter.className}>Leaderboard</h3>
        </div>
        <div className={styles.label}>
          <div className={styles.card}>
            <h1 className={inter.className}>1221</h1>
          </div>
          <h3 className={inter.className}>database notes</h3>
        </div>
        <div className={styles.label}>
          <div className={styles.card}></div>
          <h3 className={inter.className}>users</h3>
        </div>
      </div>
    </div>
  );
}

export default page;
