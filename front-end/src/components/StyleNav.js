import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestURL } from "../requestURL";

export default function StyleNav(props) {
  const [styles, setStyles] = useState([])

  const handleClick = (style) => {
    // console.log('style', style)
    props.filterByStyle(style);
  };

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await axios.get(
          requestURL + 'posts/styles');
        console.log("* Fetching Styles...")
        setStyles(response.data.styles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStyles()
  }, [])

  return (
    <div>
      <nav className="flex mt-16 mb-4 sm:justify-center space-x-6 px-2 bg-white text-center overflow-x-auto">
        {styles.map((style, i) => (
          <button
            key={i}
            className="rounded-lg px-3 py-2 h-max my-auto text-slate-700 font-semibold 
                                        active:underline active:underline-offset-4 focus:underline focus:underline-offset-4 hover:bg-slate-100 hover:text-slate-900"
            onClick={() => {
              handleClick(style);
            }}
          >
            {style}
          </button>
        ))}
      </nav>
    </div>
  );
}
