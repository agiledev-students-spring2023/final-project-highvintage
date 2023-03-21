import React, { useState } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import DiscussionPreviewFull from "../components/Saved/DiscussionPreviewFull";
import SavedHeader from "../components/Saved/SavedHeader";
import { dummyDiscussions } from "../dummy/discussions";

export default function Saveddiscussion() {
  const [discussions, setDiscussions] = useState(dummyDiscussions);
  const discussionComponents = discussions.map((discussion) => (
    <DiscussionPreviewFull
      key = {discussion.id}
      id = {discussion.id}
      title={discussion.title}
      discuss={discussion.content}
      date={discussion.date}
    ></DiscussionPreviewFull>
  ));
  return (
    <>
      <GenericHeader pageName="Saved"></GenericHeader>
      <SavedHeader pageName="Discussion"></SavedHeader>
      <div className="grid grid-cols-1 gap-3 my-1 mt-2 mb-16">
       {discussionComponents} 
      </div>
        <MainNav></MainNav>
    </>
  );
}
