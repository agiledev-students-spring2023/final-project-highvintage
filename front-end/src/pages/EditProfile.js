import React, { useState } from "react";
import GenericHeader from "../components/GenericHeader";

export default function EditProfile() {
  const [loggedIn, setLoggedIn] = useState({
    username: "lisa_li",
    profilePicture:
      "https://images.unsplash.com/photo-1541823709867-1b206113eafd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    style: "Streetwear",
    favoriteThrift: "Urban Jungle",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    followers: "623",
    following: "302",
    posts: "67",
  });

  const [update, setUpdate] = useState({});

  function handleSubmit() {
    // ignore all empty strings - besides bio

    // logic prior to update DB api call is made
    for (const prop in update) {
    }

    // check non-empty strings
  }
  return (
    <>
      {" "}
      <GenericHeader pageName="Edit profile" />{" "}
      <div className="flex flex-wrap justify-center">
        {" "}
        <img
          className="h-32 object-cover aspect-square mt-20 rounded-full"
          src={loggedIn.profilePicture}
        />{" "}
      </div>{" "}
      <div className="mt-4 text-center">
        <a className="text-sky-800 font-semibold"> Change profile photo </a>

        <form className="mt-6">
          <div className="mb-2">
            <label className="p-1 w-1/4" for="name">
              Username{" "}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="ml-2 w-2/4 p-1"
              placeholder={loggedIn.username}
              size="10"
              onChange={(e) =>
                setUpdate({ ...update, username: e.target.value })
              }
            />
          </div>

          <div className="mb-2">
            <label className="p-1  w-1/4" for="name">
              Favorite Thrift{" "}
            </label>
            <input
              type="text"
              id="favThrift"
              className="ml-2 w-2/4 p-1"
              placeholder={loggedIn.favoriteThrift}
              size="10"
              onChange={(e) =>
                setUpdate({ ...update, favoriteThrift: e.target.value })
              }
            />
          </div>

          <div className="mb-2">
            <label className="p-1  w-1/4" for="name">
              Style{" "}
            </label>
            <select
              type="text"
              id="style"
              name="style"
              className="ml-2 w-2/4 p-1"
              onChange={(e) => setUpdate({ ...update, style: e.target.value })}
            >
              <option> {loggedIn.style} </option>
              <option> Athlesuire </option>
              <option> X </option>
              <option> Y </option>
              <option> Z </option>
            </select>
          </div>

          <div className="mb-2">
            <label className="p-1 align-top" for="bio">
              Bio{" "}
            </label>{" "}
            <textarea
              className="p-1 w-2/4"
              rows="10"
              id="bio"
              placeholder={loggedIn.bio}
              onChange={(e) => setUpdate({ ...update, bio: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="mt-2 text-sky-800 font-semibold"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {" "}
            Save changes
          </button>
        </form>
      </div>
    </>
  );
}
