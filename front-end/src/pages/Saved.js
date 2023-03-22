import React, { useState } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import SavedHeader from "../components/Saved/SavedHeader";
import OutfitPreview from "../components/OutfitPreview";
import { dummyUsers } from "../dummy/users";
import DiscussionTitleOnly from "../components/Saved/DiscussionTitleOnly";
import { dummyDiscussions } from "../dummy/discussions";

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
      date={discussion.date}
    ></DiscussionTitleOnly>
  ));

 
  return (
    <>
      <GenericHeader pageName="Saved"></GenericHeader>
      <SavedHeader pageName="Outfits"></SavedHeader>
      {/* outfit grid */}
      <div className="grid grid-cols-3 gap-1">{OutfitPreviews}</div>
      <div className="-mt-8"><SavedHeader pageName="Discussions"></SavedHeader></div>
      <div className="grid grid-cols-1 gap-3 my-1 mt-2 mb-16">
        {discussionComponents}
      </div>
      <MainNav></MainNav>
      </>
  );
}
