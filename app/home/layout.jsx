"use client";
import Footer from "@/components/footer/Footer";
import React, { useEffect } from "react";
import styles from "./layout.module.css";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading/Loading";
import { useRouter } from "next/navigation";

function RootLayout({ children }) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth.login");
    }
  }, [session.status]);
  const user = session.data?.user;
  return (
    <div className={styles.layout}>
      {user ? children : <Loading />}
      <Footer />
    </div>
  );
}

export default RootLayout;
