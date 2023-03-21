import React from "react";
import { dummyComments } from "../dummy/comments";

export default function Comment(props) {
  // keep from accessing many props all the time
  const user = props.user;
  return (
    <>
      <div className="grid grid-cols-12 p-3 bg-white mb-3">
        <div className="col-span-2">
          {" "}
          <img className="h-20 object-cover aspect-square" src={user.photo} />
        </div>

        <div className="col-span-9 ml-4">
          {" "}
          <p className="align-center font-semibold"> @{user.username} </p>
          <p> {props.body} </p>
        </div>
      </div>
    </>
  );
}
