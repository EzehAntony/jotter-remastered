"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./newnote.module.css";
const getData = async () => {
  await fetch("/api/note");
};

function newnote({ params }) {
  const router = useRouter();

  const [input, setInput] = useState({
    title: "",
    body: "",
  });

  const [status, setStatus] = useState({
    //To keep the state of the check entry. True if the user has entered both a title and a body, false if the user hasn't entered a character in both.
    inputStatus: false,
    //to keep the state of the status of the note. false if old, true if new
    newStatus: null,
  });

  //to check if the user has entered a title or a body
  const checkIfEntry = () => {
    if (input.title !== "" && input.body !== "") {
      setStatus((prev) => ({ ...prev, inputStatus: true }));
    } else {
      setStatus((prev) => ({ ...prev, inputStatus: false }));
    }
  };

  //check if page is new or an existing note
  const checkifExist = () => {
    // params[1] is /newnote
    //params[2] would be ther old note id
    //so if there is 1, the note is old and if there isn't the note is new.
    if (params.note.length <= 1) {
      setStatus((prev) => ({ ...prev, newStatus: true }));
    } else if (params.note.length == 2) {
      setStatus((prev) => ({ ...prev, newStatus: false }));
    }
  };

  //runs everytime the input updates
  useEffect(() => {
    checkIfEntry();
  }, [input]);

  //fetch note data if old note
  useEffect(() => {
    checkifExist();
  }, [params, status.newStatus]);

  //if old, configure update, if new, save new note.

  const save = async () => {
    console.log("Saved..");
    if (status.newStatus === true) {
      await fetch({
        method: "POST",
        url: "/api/note",
        credentials: "include",
        body: {
          title: input.title,
          body: input.body,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  return (
    <div className={styles.newnote}>
      <header>
        <div className={styles.image}>
          <img src="/left.svg" onClick={() => router.back(-1)} alt="" />
          {status.inputStatus ? (
            <img src="/save.png" onClick={save} className={styles.save} />
          ) : (
            ""
          )}
        </div>
        <input
          value={input.title}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, title: e.target.value }))
          }
          type="text"
          maxLength={15}
          placeholder="title"
        />
      </header>

      <textarea
        maxLength={1000}
        placeholder="Enter note content text here"
        value={input.body}
        onChange={(e) =>
          setInput((prev) => ({ ...prev, body: e.target.value }))
        }
      ></textarea>
    </div>
  );
}

export default newnote;
