import React from "react";
import ProfilePreview from "../components/ProfilePreview";
import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function Following() {
  // this page uses a different API call to get user's list of following
  // thats why i made it a seperate page
  const [followers, setFollowers] = useState([
    {
      username: "user93028394",
      photo:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
    },
    {
      username: "thriftlover",
      photo:
        "https://images.unsplash.com/photo-1630208232589-e42b29428b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1538&q=80",
    },
    {
      username: "kate7725",
      photo:
        "https://images.unsplash.com/photo-1622842182823-28bfbfba47e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60",
    },
    {
      username: "big_dinner",
      photo:
        "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1317&q=80",
    },
    {
      username: "user2309",
      photo:
        "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    },
    {
      username: "user30943",
      photo:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=60",
    },
    {
      username: "iloveshopping",
      photo:
        "https://images.unsplash.com/photo-1670272504471-61a632484750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      username: "awesomesauce8384",
      photo:
        "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2xvdGhlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60",
    },
    {
      username: "krunker",
      photo:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ]);

  const followerComponents = followers.map((follower) => (
    <ProfilePreview username={follower.username} photo={follower.photo} />
  ));
  return (
    <>
      <div className="fixed bg-white top-0 left-0 right-0 grid w-80 grid-cols-2 p-3">
        {" "}
        <FaLongArrowAltLeft />
        <h1 className="text-center text-2xl font-extrabold">
          {" "}
          Following{" "}
        </h1>{" "}
      </div>
      <div className="grid grid-cols-1 mt-12">{followerComponents}</div>{" "}
    </>
  );
}
