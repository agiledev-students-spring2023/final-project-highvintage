import React from "react";
import { dummyStyles } from "../dummy/styles";

export default function StyleNav(props) {
  const styles = dummyStyles;

  const handleClick = (style) => {
    // console.log('style', style)
    props.filterByStyle(style);
  };

  return (
    <div>
      <nav className="flex mt-16 mb-4 sm:justify-center space-x-6 px-2 bg-white text-center overflow-x-auto">
        {styles.map((style) => (
          <button
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
