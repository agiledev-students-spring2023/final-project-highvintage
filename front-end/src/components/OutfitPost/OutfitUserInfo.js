import React from "react";
import { useNavigate } from "react-router-dom";

export default function OutfitUserInfo(props) {
  const navigate = useNavigate();
  const showProfile = () => {
    const path = "/profile/" + props.username;
    navigate(path);
  };
  console.log(props.postDate)
  console.log(props.photo)

  let photo = props.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  
  return (
    <div className="grid grid-cols-3 px-3 py-2">
      <div className="flex col-span-2 gap-x-4">
        <img
          className="h-12 my-auto object-cover aspect-square rounded-full justify-self-end"
          src={photo}
          onClick={showProfile}
          alt="user"
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

      <div className="my-auto col-span-1">
        <p className="text-xs text-right font-normal"> {props.postDate} </p>
      </div>
    </div> // end of grid
  );
}
