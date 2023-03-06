import React from "react";
import ProfilePreview from "../components/ProfilePreview";
import GenericHeader from "../components/GenericHeader";

export default function Search() {
  return (
    <>
      <GenericHeader pageName="Search" />
      <form className="mt-12 p-5 w-full">
        <label>
          <input
            type="text"
            name="searchQuery"
            placeholder="Search for accounts..."
            className="ml-5 border w-80 mr-3 p-1"
          />
        </label>
        <input type="submit" value={"Search"} className="bg-gray-400 p-1" />
      </form>
    </>
  );
}
