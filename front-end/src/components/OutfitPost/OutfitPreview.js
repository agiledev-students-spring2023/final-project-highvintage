import React from "react";
import { Link } from "react-router-dom";
// import myImg from '../../../../back-end/public/uploads/my_files-1681848421971.png';

export default function OutfitPreview(props) {
  // console.log('props', props);
  // individual preview within the grid - appears in OutfitCollection page
  return (
    <div className="w-full h-full">
      <Link to={"/outfit-view/" + props.id}>
        <img
          className="object-cover w-full h-full aspect-square justify-self-end"
          src={props.photo}
          alt="preview"
        />
      </Link>
    </div>
  );
}
