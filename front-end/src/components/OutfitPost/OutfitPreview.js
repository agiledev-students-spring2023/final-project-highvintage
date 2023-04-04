import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function OutfitPreview(props) {
  console.log(props);
  // individual preview within the grid - appears in OutfitCollection page
  return (
    <div className="w-full h-full">
      <Link to={"/outfit-view/" + props.id}>
        <img
          className="object-cover w-full h-full aspect-square justify-self-end"
          src={props.photo}
        />
      </Link>
    </div>
  );
}
