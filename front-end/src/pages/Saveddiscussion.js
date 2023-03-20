import React from "react";
import GenericHeader from "../components/GenericHeader";
import DiscussionPreviewFull from "../components/Saved/DiscussionPreviewFull";
import DiscussionThread from "../components/Saved/DiscussionPreviewFull";
import SavedHeader from "../components/Saved/SavedHeader";
import { dummyDicussions } from "../dummy/discussions";

export default function Saveddiscussion() {
  // const [discussions, setDiscussions] = useState[dummyDiscussions];
  return (
    <>
      <GenericHeader pageName="Saved"></GenericHeader>
      <SavedHeader pageName="Discussion"></SavedHeader>
      <br></br>
      <DiscussionPreviewFull title = "Test Title" discuss = "Test Discuss"></DiscussionPreviewFull>
    </>
  );
}
