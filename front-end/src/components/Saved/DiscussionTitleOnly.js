import React from "react";
import { Link } from 'react-router-dom'

function DiscussionTitleOnly(props) {
  
  const handleOnClick = () => {
    console.log(props.id)
    const id = props.id
    return id
  }
  return (
    <div className="mx-auto w-80 h-20">
      <Link to="/discussion-view" id={props.id}>
        <div className="grid grid-cols-1 gap-2 bg-white rounded-lg shadow-sm border-solid border-black border-2 h-full">
          <h2 className="flex text-center justify-center items-center ml-2 pt-2 text-lg font-bold leading-none font-serif">
            {props.title}
          </h2>
        </div>
      </Link>
    </div>
  );
}
export default DiscussionTitleOnly;

