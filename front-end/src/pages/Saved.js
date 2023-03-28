import React, { useState } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import SavedHeader from "../components/Saved/SavedHeader";
import OutfitPreview from "../components/OutfitPreview";
import { dummyUsers } from "../dummy/users";
import DiscussionTitleOnly from "../components/Saved/DiscussionTitleOnly";
import { dummyDiscussions } from "../dummy/discussions";
import DiscussionFullView from "../components/Saved/DiscussionFullView";
import DiscussionView from "./DiscussionView";

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
    <DiscussionView
      key={discussion.id}
      id={discussion.id}
      title={discussion.title}
      date={discussion.date}
    ></DiscussionView>
  ));

 
  return (
    <>
      <GenericHeader pageName="Saved"></GenericHeader>
      <SavedHeader pageName="Outfits"></SavedHeader>
      {/* outfit grid */}
      <div className="ml-3 mr-3 mt-3 mb-3 grid grid-cols-3 gap-3">
        {OutfitPreviews.slice(0, 3)} 
      </div>
      <div className="-mt-7"><SavedHeader pageName="Discussions"></SavedHeader></div>
      <div className="mt-0 grid grid-cols-1 gap-1 mb-16">
        {discussionComponents}
      </div>
      <MainNav></MainNav>
      </>
  );
}
