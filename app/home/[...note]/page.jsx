"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./newnote.module.css";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ClapSpinner } from "react-spinners-kit";

function newnote({ params }) {
  const router = useRouter();
  const id = params.note.slice(-1)[0];
  const session = useSession();
  const user = session.data.user;
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [noteData, setNoteData] = useState(null);

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

  const fetchData = async (id) => {
    //check if it's a new note or an existing one
    //if old, fetch old data else do nothing
    if (status.newStatus === false) {
      await axios({
        url: "/api/note/get",
        method: "POST",
        data: {
          id: id,
        },
      })
        .then((res) => {
          setInput((prev) => ({ ...prev, title: res.data.title }));
          setInput((prev) => ({ ...prev, body: res.data.body }));
        })
        .catch((err) => {
        });
    } else {
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [status.newStatus]);

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
    if (status.newStatus === false) {
      setLoading(true);
      await axios({
        method: "PUT",
        url: "/api/note/update",
        credentials: "include",
        data: {
          title: input.title,
          body: input.body,
          id: id,
        },
      })
        .then((res) => {
          setLoading(false);
          console.log(res);
          setSaved(true);
          router.push("/home");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setLoading(true);
      await axios({
        method: "POST",
        url: "/api/note/create",
        credentials: "include",
        data: {
          title: input.title,
          body: input.body,
          userId: user._id,
        },
      })
        .then((res) => {
          setLoading(false);
          console.log(res);
          setSaved(true);
          router.push("/home");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const deleteNote = async () => {
    setLoading(true);
    await axios({
      method: "DELETE",
      url: "/api/note/delete",
      data: {
        id: id,
      },
    })
      .then((res) => {
        setLoading(false);
        router.push("/home");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className={styles.newnote}>
      <header>
        <div className={styles.image}>
          <img src="/left.svg" onClick={() => router.back(-1)} alt="" />
          {status.inputStatus && user && !loading && !saved ? (
            <img src="/cloud.svg" onClick={save} className={styles.save} />
          ) : (
            ""
          )}
          {loading && (
            <ClapSpinner
              size={19}
              frontColor={"#2CC2EC"}
              className={styles.save}
              loading={loading}
            />
          )}

          {status.inputStatus && (
            <img
              src="/delete.svg"
              onClick={deleteNote}
              className={styles.delete}
              alt=""
            />
          )}
          {saved && <img src="/saved.svg" className={styles.save} />}
        </div>
        <input
          value={input.title}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, title: e.target.value }))
          }
          type="text"
          maxLength={20}
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
