import React, { useState, useEffect } from "react";
import GenericHeader from "../components/GenericHeader";
import axios from "axios";
import { requestURL } from "../requestURL";

export default function EditProfile() {
  const [loggedIn, setLoggedIn] = useState({});
  const [err, setErr] = useState(false);

  useEffect(() => {
    async function fetchMe() {
      const response = await axios.get(requestURL + "users/me");
      setLoggedIn(response.data.user);
    }

    fetchMe();

    return () => {};
  }, []);

  const [update, setUpdate] = useState({});

  async function handleSubmit() {
    // dont change things that are empty
    const changes = {};

    if (update["username"]) {
      if (update["username"].length <= 2) {
        setErr(true);
      } else {
        changes["username"] = update["username"];
        setErr(false);
      }
    }

    if (update["favoriteThrift"]) {
      if (update["favoriteThrift"].length <= 2) {
        setErr(true);
      } else {
        changes["favoriteThrift"] = update["favoriteThrift"];
        setErr(false);
      }
    }

    if (update["style"]) {
      changes["style"] = update["style"];
    }

    if (update["bio"] && update["bio"].length > 0) {
      // do not update bio if empty
      changes["bio"] = update["bio"];
    }

    if (!err && changes) {
      // send changes with cleaned changes as the request body
      const response = await axios
        .put(requestURL + "users/edit-profile", {
          changes,
        })
        .catch((err) => console.log(err));
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
          src={loggedIn.photo}
        />{" "}
      </div>{" "}
      <div className="mt-4 text-center">
        <a className="text-sky-800 font-semibold"> Change profile photo </a>

        <form className="mt-6">
          <div className="mb-2">
            <label className="p-1 w-1/4" htmlFor="name">
              Username{" "}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="ml-2 w-2/4 p-1"
              placeholder={loggedIn.username}
              size="10"
              minLength={3}
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
