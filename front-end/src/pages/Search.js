import React from "react";
import GenericHeader from "../components/GenericHeader";
import { useState } from "react";
import ProfilePreview from "../components/Profile/ProfilePreview";
import axios from "axios";
import { requestURL } from "../requestURL";
import { useNavigate } from "react-router-dom";
import config from "../token";

export default function Search() {
  const [found, setFound] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const nav = useNavigate();

  async function search(query) {
    try {
      const response = await axios.get(
        requestURL + "users/search?query=" + query, config
      );

      setFound(response.data.found);

      const viewable = found.map((user, idx) => (
        <ProfilePreview
          key={idx}
          photo={
            user.photo
              ? user.photo
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          username={user.username}
        />
      ));

      setResults(viewable);
    } catch (e) {
      nav("/500");
    }
  }

  return (
    <>
      <GenericHeader pageName="Search" />
      <form className="mt-12 p-5 w-full text-center">
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
          className=" bg-gray-400 py-1 px-2 mt-3"
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
        <p className="text-center p-10"> No users found. </p>
      )}
    </>
  );
}
