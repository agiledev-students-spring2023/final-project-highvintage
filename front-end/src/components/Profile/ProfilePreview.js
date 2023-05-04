import React from "react";

export default function ProfilePreview(props) {
  return (
    <div className="mt-2 grid w-80 grid-cols-2 p-3">
      <img
        className="h-16 w-16 rounded-full object-cover justify-self-end"
        src={props.photo}
      />
      <a className="ml-3 align-center" href={"/profile/" + props.username}>
        {" "}
        {props.username}{" "}
      </a>
    </div>
  );
}
