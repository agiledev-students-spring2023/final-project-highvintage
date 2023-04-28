import React from "react";
import { useState, useEffect } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import OutfitPost from "../components/OutfitPost/OutfitPost";
import Loading from "../components/Loading";
import axios from "axios";
import { requestURL } from "../requestURL";

export default function Home() {
  const [viewable, setViewable] = useState([]);
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  useEffect(() => {
    async function fetchFeed() {
      try {
        const response = await axios.get(requestURL + "posts/feed");
        setLoaded(true);
        const results = response.data.feed.map((post) => {
          // each element is a post by a followed user!

          // rewriting post for outfitPost
          const thisPost = {
            authorPhoto: post.author.photo
              ? post.author.photo
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
            authorUsername: post.author.username,
            author: post.author._id,
            postLoc: post.location,
            postDate: post.posted,
            photos: post.photos.map((photo) => {
              return { data: arrayBufferToBase64(photo.data.data) };
            }),
            postID: post._id,
            date: post.posted,
            likes: post.likes,
            postText: post.caption,
            postLike: post.likes,
            likeArray: post.likes,
            comments: post.comments,
            _id: post._id,
          };

          return <OutfitPost key={post._id} post={thisPost} />;
        });

        setViewable(results);
      } catch (e) {
        setErr(true);
      }
    }

    fetchFeed();

    return () => {};
  }, []);

  return (
    <div>
      <GenericHeader pageName="HighVintage"></GenericHeader>
      <div className="mt-14 flex flex-col justify-center items-center space-y-4"></div>
      {viewable.length > 0 ? (
        viewable
      ) : (
        <div>
          {loaded ? (
            <div className="flex flex-col items-center justify-center h-40">
              <p className="text-gray-500 text-sm text-center mb-2">
                {err
                  ? "Oops! Looks like something went wrong on our end."
                  : "Looks like you don't follow anyone yet!"}
              </p>
              <p className="text-gray-500 text-sm text-center">
                {err
                  ? "One sec!"
                  : "Try following other users to view your home feed and discover new content that you'll love."}
              </p>
            </div>
          ) : (
            <div className="-mt-14">
              {" "}
              <Loading />{" "}
            </div>
          )}
        </div>
      )}
      <div className="mt-14">
        <MainNav />
      </div>
    </div>
  );
}
