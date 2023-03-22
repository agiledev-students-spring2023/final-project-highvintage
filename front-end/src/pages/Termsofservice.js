import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import GenericHeader from "../components/GenericHeader";

export default function Termsofservice() {
  return (
    /*
    Lorem Ipsum placeholder for terms of service.
    */
    <>
      {/* <div className="fixed bg-white top-0 left-0 right-0 grid w-60 grid-cols-2 p-3">
        <FaLongArrowAltLeft />
        <h1 className="whitespace-nowrap text-center text-2xl font-extrabold">
          Terms of Service
        </h1>
      </div> */}
      <GenericHeader pageName = "Terms of Service"/>
      <div className="px-10 pt-20 text-base leading-7 text-gray-600 text-justify">
        <p>
          Maecenas nunc enim, convallis eget sapien ut, tempor malesuada urna.
          Pellentesque vestibulum blandit sapien, a lobortis diam pulvinar eu.
          Sed ultrices, diam vel interdum tincidunt, metus erat tempus odio, sed
          porta mi ligula ut turpis. Nulla id vestibulum ex, ut luctus arcu.
          Etiam venenatis libero eu ipsum mollis imperdiet. Duis vel luctus
          neque, a suscipit turpis. Aenean molestie est ac placerat venenatis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo
          velit quis libero gravida, sit amet malesuada urna luctus. Sed pretium
          neque vel leo rhoncus, et blandit risus auctor. Praesent ultricies eu
          ipsum in facilisis. Proin pulvinar placerat dictum. Donec fermentum
          felis ut nulla ultricies iaculis. Ut ultricies tincidunt viverra.
          Curabitur eleifend euismod metus ac finibus. Fusce cursus lobortis
          purus, tempor ultrices ante interdum eu. Maecenas interdum, velit a
          faucibus vulputate, augue augue commodo ex, a tristique diam quam
          imperdiet mauris. Aliquam sit amet tincidunt nibh.
        </p>
      </div>
    </>
  );
}
