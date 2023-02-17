"use client";

import store from "@/redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import "./globals.css";
import Loading from "@/components/loading/Loading";

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <head />
      <body>
        <SessionProvider session={session}>
          <Provider store={store}>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
