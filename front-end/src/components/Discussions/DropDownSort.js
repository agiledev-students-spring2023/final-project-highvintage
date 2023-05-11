import React, {useState} from 'react'

export default function DropDownMenuTwo(props) {
    const [showMenu, setShowMenu] = useState(false);
  return (
    <>
    <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="absolute right-0 mr-3 py-2 px-4 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {props.menuName}{" "}
          <svg
            className="inline-block h-5 w-5"    
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.292 6.292a1 1 0 011.414 0L10 8.586l2.293-2.294a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {showMenu && (
          <div className="absolute right-0 mr-3 mt-11 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                onClick={props.handleOptionOneClick}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {props.optionOne}
              </button>
              <button
                onClick={props.handleOptionTwoClick}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {props.optionTwo}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
