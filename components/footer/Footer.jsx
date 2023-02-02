"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "./footer.module.css";

function Footer() {
  const router = useRouter();
  return (
    <div className={styles.footer}>
      <div className={styles.innerFooter}>
        <img src="/app.svg" onClick={() => router.push("/home")} alt="" />
        <img src="/plus.svg" onClick={() => router.push("/newnote")} alt="" />
        <img
          src="/profile.svg"
          onClick={() => router.push("/profile")}
          alt=""
        />
      </div>
    </div>
  );
}

export default Footer;
