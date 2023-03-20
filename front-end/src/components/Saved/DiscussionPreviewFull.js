import React from 'react'

/*
Displays preview of discussion with title and content
*/
function DiscussionPreviewFull(props) {
  return (
    <>
    <div className="grid grid-cols-1 bg-white rounded-lg mx-auto shadow-sm border-solid border-black border-2 w-80">
        <div className="flex flex-col gap-2 ">
          <h2 className="ml-2 pt-2 text-lg font-serif leading-none font-bold">{props.title}</h2>
          <hr className="h-0 border-none pt-1 mb-0  bg-gray-200 border-0"></hr>
          <p className="mx-1 px-2 pb-1 text-base text-justify line-clamp-3 ">{props.discuss}</p>
        </div>
      </div>
    </>
  )
}

export default DiscussionPreviewFull