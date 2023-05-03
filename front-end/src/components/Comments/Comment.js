import React from "react";

export default function Comment(props) {
  // keep from accessing many props all the time
  return (
    <>
      <div className="grid grid-cols-12 p-3 bg-white mb-3">
        <div className="col-span-2">
          {" "}
          <img className="object-cover w-12 h-12 rounded-full" src={props.photo} />
        </div>

        <div className="col-span-9 ml-4">
          {" "}
          <a href={"/profile/" + props.username}> @{props.username} </a>
          <p> {props.body} </p>
        </div>
      </div>
    </>
  );
}
