"use client";
import React from "react";
import styles from "./styles.module.css";
import { ClapSpinner } from "react-spinners-kit";
function Loading() {
  return (
    <div className={styles.loading}>
      <ClapSpinner size={"25"} frontColor={"#2CC2EC"} />
    </div>
  );
}

export default Loading;
