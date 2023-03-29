import React, { useState } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import SavedHeader from "../components/Saved/SavedHeader";
import OutfitPreview from "../components//OutfitPost/OutfitPreview";
import { dummyUsers } from "../dummy/users";
import { dummyDiscussions } from "../dummy/discussions";
import DiscussionTitleOnly from "../components/Saved/DiscussionTitleOnly";

export default function SavedOutfits() {
  const [users, setUsers] = useState(dummyUsers);

  const OutfitPreviews = users.map((user) => (
    <OutfitPreview
      key={user.id}
      id={user.id}
      photo={user.posts[0].postMedia[0]}
    />
  ));
  const [discussions, setDiscussions] = useState(dummyDiscussions);
  const discussionComponents = discussions.map((discussion) => (
    <DiscussionTitleOnly
      key={discussion.id}
      id={discussion.id}
      title={discussion.title}
    ></DiscussionTitleOnly>
  ));

  return (
    <>
      <GenericHeader pageName="Saved"></GenericHeader>
      <SavedHeader
        pageName="Outfits"
        showButton="true"
        page="/saved-outfits"
      ></SavedHeader>
      <div className="ml-3 mr-3 mt-3 mb-3 grid grid-cols-3 gap-3">
        {OutfitPreviews.slice(0, 3)}
      </div>
      <div className="-mt-7">
        <SavedHeader
          pageName="Discussions"
          showButton="true"
          page="/saved-discussion"
        ></SavedHeader>
      </div>
      <div className="grid grid-cols-1 gap-3 my-1 mt-2 mb-16">
        {discussionComponents}
      </div>
      <MainNav></MainNav>
    </>
  );
}
