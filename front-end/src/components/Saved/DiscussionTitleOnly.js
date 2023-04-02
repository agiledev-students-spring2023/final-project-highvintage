import React from "react";
import { Link } from "react-router-dom";

function DiscussionTitleOnly(props) {
  const handleOnClick = () => {
    console.log(props.id);
    const id = props.id;
    return id;
  };
  return (
    <div className="ml-2 mr-2 h-20">
      <Link to={`/discussion-view/${props.id}`}>
        <div className="grid grid-cols-1 gap-2 bg-white shadow-sm border-solid border-black border h-full">
          <h2 className="flex text-center justify-center items-center ml-2 pt-2 text-lg leading-none font-serif">
            {props.title}
          </h2>
        </div>
      </Link>
    </div>
  );
}
export default DiscussionTitleOnly;
