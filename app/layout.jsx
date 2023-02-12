"use client";

import  store  from "@/redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SessionProvider session={session}>
          <Provider store={store}>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
