"use client";
import Footer from "@/components/footer/Footer";
import React from "react";
import styles from "./layout.module.css";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading/Loading";

function RootLayout({ children }) {
  const { data } = useSession();
  const user = data?.user;
  return (
    <div className={styles.layout}>
      {user ? children : <Loading />}
      <Footer />
    </div>
  );
}

export default RootLayout;
