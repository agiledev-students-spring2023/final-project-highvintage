import React from "react";
import { useState, useEffect } from "react";
import OutfitUserInfo from "./OutfitUserInfo";
import OutfitMedia from "./OutfitMedia";
import OutfitPostInteraction from "./OutfitPostInteraction";
import OutfitText from "./OutfitText";

export default function OutfitPost(props) {
  const [imgSrcs, setImgSrcs] = useState([]);

  const details = props.post;
  console.log('details', details);

   useEffect(() => {
     const newImgSrcs = details.photos.map((photo) => {
      // console.log('photo', photo)
      return "data:image/jpeg;base64," + photo.data;
    });
    setImgSrcs(newImgSrcs);
   }, [details.photos]);
  
  // imgSrcs.length > 0 && console.log('imgSrcs', imgSrcs)

  return (
    // full outfit post - 4 children components combined
    <div className="grid grid-row-4 py-2 bg-white rounded-lg shadow-md">
      <OutfitUserInfo
        photo={details.authorPhoto}
        username={details.authorUsername}
        location={details.postLoc}
        postDate={details.date}
      />

      <div className="flex flex-row overflow-x-auto justify-self-center">
        <OutfitMedia
          username={details.authorUsername}
          media={imgSrcs}
        />
      </div>

      <OutfitPostInteraction
        username={details.authorUsername}
        postID={details._id}
        likes={details.likes.length}
        // likes={0}
        likeArray={details.postLike}
        comments={details.comments}
        authorID = {details.author}
      />
      <OutfitText likes={0} text={details.postText} />
    </div>
  );
}
