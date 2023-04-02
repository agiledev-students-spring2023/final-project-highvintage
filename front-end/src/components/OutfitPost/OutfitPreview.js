import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function OutfitPreview(props) {
  const navigateTo = useNavigate();

  // individual preview within the grid - appears in OutfitCollection page
  return (
    <div className="w-full h-full">
      <Link to={"/outfit-view/" + props.id}>
        <img
          className="object-cover aspect-square justify-self-end"
          src={props.photo}
        />
      </Link>
    </div>
  );
}
