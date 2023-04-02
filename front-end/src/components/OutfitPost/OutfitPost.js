import React from "react";
import { useState } from "react";
import { dummyUsers } from "../../dummy/users";
import StyleNav from "../StyleNav";
import OutfitUserInfo from "./OutfitUserInfo";
import OutfitMedia from "./OutfitMedia";
import OutfitPostInteraction from "./OutfitPostInteraction";
import OutfitText from "./OutfitText";

export default function OutfitPost(props) {
  const [users, setUsers] = useState(dummyUsers);

  // authorID , authorPhoto, authorUsername
  // and post

  const details = props.post;
  return (
    // full outfit post - 4 children components combined
    <div className="grid grid-row-4 py-2 bg-white rounded-lg shadow-md">
      <OutfitUserInfo
        photo={details.authorPhoto}
        username={details.authorUsername}
        location={details.found.postLoc}
        postDate={users[0].posts[0].postDate}
      />

      <div className="flex flex-row overflow-x-auto justify-self-center">
        <OutfitMedia
          username={details.authorUsername}
          media={details.found.postMedia}
        />
      </div>

      <OutfitPostInteraction
        postID={details.found.postId}
        likes={details.found.postLike.length}
        likeArray={details.found.postLike}
      />
      <OutfitText
        likes={details.found.postLike.length}
        text={details.found.postText}
      />
    </div>
  );
}
