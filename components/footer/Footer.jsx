"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./footer.module.css";

function Footer({ params }) {
  const router = useRouter();
  return (
    <div className={styles.footer}>
      <div className={styles.innerFooter}>
        <img src="/app.svg" onClick={() => router.push("/home")} alt="" />
        <img
          src="/plus.svg"
          onClick={() => router.push("/home/newnote")}
          alt=""
        />
        <img
          src="/profile.svg"
          onClick={() => router.push("/home/profile")}
          alt=""
        />
      </div>
    </div>
  );
}

export default Footer;
