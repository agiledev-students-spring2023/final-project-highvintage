import React from "react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import StyleNav from "../components/StyleNav";
import OutfitPreview from "../components/OutfitPost/OutfitPreview";
import { dummyUsers } from "../dummy/users";
import axios from "axios";
import { useEffect } from "react";
import { requestURL } from "../requestURL";

export default function OutfitCollection() {
  const navigate = useNavigate();
  // const [users, setUsers] = useState(dummyUsers);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [me, setMe] = useState("");
  const [style, setStyle] = useState("");

  const [allPosts, setAllPosts] = useState([]);

  const filterByStyle = useCallback((style) => {
    console.log("Style", style);
    console.log('allPosts', allPosts)

    let newPosts = [];
    if (allPosts.length > 0) {
      if (style === "All" || style === "") {
        newPosts = allPosts;
      } else {
        allPosts.map((p) => {
          if (style === p.style) {
            newPosts.push(p)
          }
        })
      }
      setStyle(style);
      setFilteredPosts(newPosts);
    }
  }, [allPosts]);

  useEffect(() => {
    async function fetchCollection() {
      const response = await axios
        .get(requestURL + "posts/collection")
        .then(console.log("* Fetched"))
        .catch((err) => {
          if (err) {
            console.log("Error :", err);
          }
        });
      
      console.log('response', response);

      if (response) {
        console.log("* Fetched Posts", response.data.allPosts);
        setAllPosts(response.data.allPosts);
        console.log('* setAllPosts result', allPosts)
      }
    }
    fetchCollection();
  }, []);

  useEffect(() => {
    if (allPosts.length > 0) {
      filterByStyle(style);
    }
  }, [allPosts, style, filterByStyle]);

  console.log('filteredPosts', filteredPosts);

  const OutfitPreviews = filteredPosts.map((post) => (
    post.photos.length > 0 &&
    <OutfitPreview
      key={post._id}
      id={post._id}
      photo={post.photos[0]} // first photo as preview
    />
  ));

  /*
  // dummy user
  const filterByStyle = (style) => {
    console.log(style)
    let newPosts

    style == 'All'
      ? newPosts = users
      : newPosts = users.filter((user) => user.posts[0].postStyle == style)
    setFilteredPosts(newPosts)
  };

  const OutfitPreviews = filteredPosts.map((user) => (
    <OutfitPreview
      key={user.id}
      id={user.id}
      photo={user.posts[0].postMedia[0]} // first photo as preview
    /> 
  ));
  */
  useEffect(() => {
    async function fetchMe() {
      const response = await axios.get(requestURL + "users/me");
      setMe(response.data.user.username);
    }
    fetchMe();
  });

  return (
    <div>
      <GenericHeader pageName="Outfits" />
      <StyleNav filterByStyle={filterByStyle}></StyleNav>

      {/* outfit grid */}
      <div className="grid grid-cols-2 gap-1">{OutfitPreviews}</div>

      <button
        onClick={() => navigate("/outfit-form")}
        className="fixed bottom-4 left-0 mb-10 w-full text-l font-bold bg-gray-500 text-white py-3"
      >
        Post
      </button>

      <MainNav linkToMe={me} />
    </div>
  );
}
