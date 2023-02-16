"use client";
import React from "react";
import axios from "axios";

function page() {
  const send = async () => {
    const res = await axios({
      url: "api/not",
      method: "POST",
      data: {
        id: "sexyambien",
        name: "axias marroni",
        age: 21,
      },
    });

    if (res.statusText == "OK") {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  return (
    <div className="" onClick={send}>
      page
    </div>
  );
}

export default page;
