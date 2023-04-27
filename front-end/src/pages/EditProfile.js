import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import GenericHeader from "../components/GenericHeader";
import Loading from "../components/Loading";
import axios from "axios";
import { requestURL } from "../requestURL";

export default function EditProfile() {
  const [loggedIn, setLoggedIn] = useState({});
  const [err, setErr] = useState(false);
  const nav = useNavigate();

  async function fetchMe() {
    try {
      const response = await axios.get(requestURL + "users/me");
      setLoggedIn(response.data.user);
    } catch (e) {
      nav("/500");
    }
  }

  useEffect(() => {
    fetchMe();
  });

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

    if (update["favThrift"]) {
      if (update["favThrift"].length <= 2) {
        setErr(true);
      } else {
        changes["favThrift"] = update["favThrift"];
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
      try {
        const response = await axios.put(requestURL + "users/edit-profile", {
          changes,
        });
        setLoggedIn(response.data.user);
        await fetchMe();
        toast.success("Changes saved!");
      } catch (e) {
        if (e.response.status === 404) {
          nav("/404");
        } else {
          toast.e("Unable to upload profile photo!");
        }
      }
    }
  }

  async function handlePhotoUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const response = await axios.post(
        requestURL + "users/upload-profile-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoggedIn({ ...loggedIn, photo: response.data.photo });
      await fetchMe();
      toast.success("Profile photo uploaded successfully!");
    } catch (e) {
      if (e.response.status === 404) {
        nav("/404");
      } else {
        toast.e("Unable to upload profile photo!");
      }
    }
  }

  return (
    <>
      <GenericHeader pageName="Edit profile" />
      {loggedIn && Object.keys(loggedIn).length > 0 ? ( // checking if logged in state is populated
        <div>
          <div className="flex flex-col items-center">
            <img
              className="bg-gray-200 h-32 object-cover aspect-square mt-20 mb-3 rounded-full"
              src={
                loggedIn.photo
                  ? loggedIn.photo
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              }
              alt="pfp"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="profile-photo-input"
            />
            <label
              htmlFor="profile-photo-input"
              className="text-blue-500 font-semibold mb-4 cursor-pointer"
            >
              Change profile photo
            </label>
            <form className="w-full px-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight"
                  placeholder={loggedIn.username}
                  minLength={3}
                  onChange={(e) =>
                    setUpdate({ ...update, username: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Favorite Thrift
                </label>
                <input
                  type="text"
                  id="favThrift"
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight"
                  placeholder={loggedIn.favThrift}
                  onChange={(e) =>
                    setUpdate({ ...update, favThrift: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="style"
                >
                  Style
                </label>
                <select
                  id="style"
                  name="style"
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight"
                  onChange={(e) =>
                    setUpdate({ ...update, style: e.target.value })
                  }
                >
                  <option value={loggedIn.style}>{loggedIn.style}</option>
                  {[
                    "Sporty and Athlesuire",
                    "Streetwear",
                    "Classic",
                    "Funk",
                    "Minimal",
                    "Other",
                  ]
                    .filter((option) => option !== loggedIn.style) // makes sure the selected style isn't shown twice in the list
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight"
                  rows="4"
                  id="bio"
                  placeholder={loggedIn.bio}
                  onChange={(e) =>
                    setUpdate({ ...update, bio: e.target.value })
                  }
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className={
                    !update.username &&
                    !update.favThrift &&
                    !update.style &&
                    !update.bio
                      ? "bg-gray-400 text-white font-bold py-2 px-4 rounded"
                      : "bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  }
                  disabled={
                    !update.username &&
                    !update.favThrift &&
                    !update.style &&
                    !update.bio
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
}
