import React from "react";

export default function ProfilePreview(props) {
  return (
    <div className="grid w-80 grid-cols-2 p-3">
      <img
        className="h-20 object-cover aspect-square justify-self-end"
        src={props.photo}
      />
      <p className="ml-3 align-center"> {props.username} </p>
    </div>
  );
}
