"use client";

import { Ubuntu } from "@next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { React, useEffect, useState } from "react";
import Snowfall from "react-snowfall";
import styles from "./login.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["500", "400", "700", "300"],
});

const page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const session = useSession();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      signIn("credentials", {
        redirect: false,
        username: username,
        password: password,
      }).then(({ ok, error }) => {
        console.log(ok, error);
        if (ok) {
          setError("Successfull login");
          setLoading(false);
          router.push("/home");
        } else {
          setLoading(false);
          setError(error);
        }
      });
    } catch (err) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <form className={styles.form} onSubmit={submit}>
          <h1 className={ubuntu.className}>
            <span>Login</span>
          </h1>
          <h2 className={ubuntu.className}>A simple notepad app</h2>

          <div className={styles.input}>
            <div className={styles.userLabel}>
              <h3 className={ubuntu.className} id={styles.username}>
                username
              </h3>
              <input
                className={styles.authInput}
                type="text"
                value={username}
                required={true}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.userLabel}>
              <h3 className={ubuntu.className} id={styles.username}>
                password
              </h3>
              <input
                className={styles.authInput}
                type="text"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type={"submit"} className={ubuntu.className}>
              {loading && "loading..."}
              {!loading && "login"}
            </button>
          </div>

          {error && error === "CredentialsSignin" ? (
            <h5 className={(styles.error, ubuntu.className)}>
              {"Something went wrong"}
            </h5>
          ) : (
            <h5 className={(styles.error, ubuntu.className)}>{error}</h5>
          )}
        </form>
        <p className={ubuntu.className}>
          Don't have an account? <Link href={"/auth/register"}> register</Link>
        </p>
      </div>
      <div className={styles.right}>
        <img className={styles.noteImg} src="/note2.svg" alt="" />
      </div>
      <Snowfall color="#00BCF5" />
    </div>
  );
};
export default page;
