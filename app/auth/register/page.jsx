"use client";

import { Ubuntu } from "@next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { React, useEffect, useState } from "react";
import Snowfall from "react-snowfall";
import styles from "./register.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { ClapSpinner } from "react-spinners-kit";

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
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    await axios({
      url: "/api/user/register",
      method: "POST",
      data: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        setError("Registered");
        router.push("/auth/login");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.message == "Request failed with status code 500") {
          setError("Network error");
          setLoading(false);
          setSuccess(false);
        } else {
          setError(err.response.data);
          setLoading(false);
          setSuccess(false);
        }
      });
  };

  return (
    <div className={styles.register}>
      <div className={styles.left}>
        <form className={styles.form} onSubmit={submit}>
          <h1 className={ubuntu.className}>
            <span>register</span>
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
                onChange={(e) =>
                  setUsername(e.target.value.trim().toLowerCase())
                }
              />
            </div>
            <div className={styles.userLabel}>
              <h3 className={ubuntu.className} id={styles.username}>
                password
              </h3>
              <input
                className={styles.authInput}
                type="password"
                required={true}
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value.trim().toLowerCase())
                }
              />
            </div>

            <button type={"submit"} className={ubuntu.className}>
              {loading && <ClapSpinner size={14} />}

              {!loading && "register"}
            </button>
          </div>

          {error && (
            <h5 className={(styles.error, ubuntu.className)}>{error}</h5>
          )}
        </form>
        <p className={ubuntu.className}>
          Already have an account? <Link href={"/auth/login"}> login</Link>
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
