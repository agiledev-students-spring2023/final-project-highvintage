import React from "react";
import { useNavigate } from "react-router-dom";

export default function OutfitUserInfo(props) {
  const navigate = useNavigate();
  const showProfile = () => {
    const path = "/profile/" + props.username;
    navigate(path);
  };

  return (
    <div className="grid grid-cols-2 px-3 py-2">
      <div className="flex gap-x-4">
        <img
          className="h-12 my-auto object-cover aspect-square rounded-full justify-self-end"
          src={props.photo}
          onClick={showProfile}
        />

        {/* if no location, only show user name*/}
        {props.location ? (
          <div className="flex flex-col text-s">
            <p className="w-fit font-semibold" onClick={showProfile}>
              {" "}
              {props.username}{" "}
            </p>
            <p className="w-fit font-normal"> @ {props.location} </p>
          </div>
        ) : (
          <p className="w-fit font-semibold my-auto" onClick={showProfile}>
            {" "}
            {props.username}{" "}
          </p>
        )}
      </div>

      <div className="my-auto">
        <p className="text-xs text-right font-normal"> {props.postDate} </p>
      </div>
    </div> // end of grid
  );
}
