import React from "react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import StyleNav from "../components/StyleNav";
import OutfitPreview from "../components/OutfitPost/OutfitPreview";
import axios from "axios";
import { useEffect } from "react";
import { requestURL } from "../requestURL";

export default function OutfitCollection() {
  const navigate = useNavigate();

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [me, setMe] = useState("");
  const [style, setStyle] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [imgSrcs, setImgSrcs] = useState([]);

  const filterByStyle = useCallback((style) => {
    let newPosts = [];

    if (allPosts.length > 0) {
      if (style === "All" || style === "") {
        newPosts = allPosts;
      } else {
        allPosts.forEach((p) => {
          if (style === p.style) {
            newPosts.push(p);
          }
        });
      }
      setStyle(style);
      setFilteredPosts(newPosts);
    }
  }, [allPosts]);

  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

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

      console.log("response", response);

      if (response) {
        console.log("* Fetched Posts", response.data.allPosts);
        setAllPosts(response.data.allPosts);
        console.log("* setAllPosts result", allPosts);
      }
    }
    fetchCollection();
  }, []);

  useEffect(() => {
    if (allPosts.length > 0) {
      filterByStyle(style);
    }
  }, [allPosts, style, filterByStyle]);

  useEffect(() => {
    const newImgSrcs = filteredPosts.map((post) => {
      const imageStr = arrayBufferToBase64(post.photos[0].data.data);
      return "data:image/jpeg;base64," + imageStr;
    });
    setImgSrcs(newImgSrcs);
  }, [filteredPosts]);

  const OutfitPreviews = filteredPosts.map((post, i) => (
    <OutfitPreview key={post._id} id={post._id} photo={imgSrcs[i]} />
  ));

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
