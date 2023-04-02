import React from "react";
import GenericHeader from "../components/GenericHeader";
import { useState } from "react";
import { dummyUsers } from "../dummy/users";
import { useEffect } from "react";
import ProfilePreview from "../components/Profile/ProfilePreview";
import axios from "axios";
import { requestURL } from "../requestURL";

export default function Search() {
  const [found, setFound] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  async function search(query) {
    const response = await axios.get(
      requestURL + "users/search?query=" + query
    );
    setFound(response.data);

    const viewable = found.map((user, idx) => (
      <ProfilePreview key={idx} photo={user.photo} username={user.username} />
    ));

    setResults(viewable);
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
            if (query !== "") {
              search(query.toLowerCase());
            }
          }}
        />
      </form>

      {results.length > 0 ? (
        results
      ) : (
        <p className="text-center"> No users found. </p>
      )}
    </>
  );
}
