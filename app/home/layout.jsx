import Footer from "@/components/footer/Footer";
import React from "react";
import styles from "./layout.module.css";

function RootLayout({ children }) {
  return (
    <div className={styles.layout}>
      {children}
      <Footer />
    </div>
  );
}

export default RootLayout;
