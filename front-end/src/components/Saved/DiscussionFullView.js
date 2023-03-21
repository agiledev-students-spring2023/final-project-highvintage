import React from 'react'

export default function DiscussionFullView(props) {
  return (
    <div className="w-full max-w-md mx-auto pt-10 mt-5 bg-white shadow-md rounded-md overflow-hidden">
      <div className="flex items-center px-4 py-2 border-b border-gray-200">
        <h2 className="text-lg font-serif leading-none font-bold text-gray-800 mr-auto">{props.title}</h2>
        <div className="flex items-center">
          <img src={props.photo} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
          <span className="text-gray-600">{props.username}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-700 leading-relaxed text-justify">
            {props.content}
        </p>
        <div className="text-right text-gray-400 text-sm mt-4">{props.date.toLocaleDateString()}</div>
      </div>
    </div>
  )
}
