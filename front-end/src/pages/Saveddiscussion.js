import React, { useState } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import DiscussionPreviewFull from "../components/Saved/DiscussionPreviewFull";
import SavedHeader from "../components/Saved/SavedHeader";
import { dummyDicussions } from "../dummy/discussions";

export default function Saveddiscussion() {
  const [discussions, setDiscussions] = useState(dummyDicussions);
  //need key id
  const discussionComponents = discussions.map((discussion) => (
    <DiscussionPreviewFull
      title={discussion.title}
      discuss={discussion.content}
    ></DiscussionPreviewFull>
  ));
  return (
    <>
      <GenericHeader pageName="Saved"></GenericHeader>
      <SavedHeader pageName="Discussion"></SavedHeader>
      <div className="pt-3"></div>
      <div className="grid grid-cols-1 gap-3 my-1 ">{discussionComponents}</div>
      <MainNav></MainNav>
    </>
  );
}
