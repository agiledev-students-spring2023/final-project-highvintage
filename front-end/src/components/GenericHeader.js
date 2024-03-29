import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import {useLocation} from 'react-router-dom';

export default function GenericHeader(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackButtonClick = () => {
    if (props.updatedUsername) {
      navigate(`/profile/${props.updatedUsername}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      {" "}
      <div className="fixed bg-white items-center z-50 top-0 left-0 right-0 w-full flex justify-between p-3">
        {" "}
        <FaLongArrowAltLeft onClick={handleBackButtonClick} />
        
        <h1 className="text-center text-2xl font-extrabold">
          {" "}
          {props.pageName}
        </h1>{" "}

        <div className="flex items-center">
        <a href="/search" className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-search"></i>
        </a>
      </div>
      </div>
    </>
  );
}
