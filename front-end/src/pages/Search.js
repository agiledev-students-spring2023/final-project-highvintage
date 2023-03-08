import React from "react";
import GenericHeader from "../components/GenericHeader";
import { useState } from "react";

export default function Search() {
  const [found, setFound] = useState([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  function handleSearch() {
    if (!isSearching) {
      return <p> hi </p>;
    }
    // query database using searched term
  }
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
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </label>
        <input
          type="submit"
          value={"Search"}
          className="bg-gray-400 p-1"
          onClick={(e) => {
            e.preventDefault();
            setIsSearching(true);
            handleSearch(query);
          }}
        />
      </form>

      {handleSearch()}
    </>
  );
}
