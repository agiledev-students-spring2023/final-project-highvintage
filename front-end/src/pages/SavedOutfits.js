import React, { useState } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import SavedHeader from "../components/Saved/SavedHeader";
import OutfitPreview from "../components/OutfitPost/OutfitPreview";
import { dummyUsers } from "../dummy/users";

export default function SavedOutfits() {
const [users, setUsers] = useState(dummyUsers);

  const OutfitPreviews = users.map((user) => (
    <OutfitPreview
      key={user.id}
      id={user.id}
      photo={user.posts[0].postMedia[0]}
    />
  ));

 
  return (
    <>
      <GenericHeader pageName="Saved"></GenericHeader>
      <SavedHeader pageName="Outfits"></SavedHeader>
      {/* outfit grid */}
      <div className="grid grid-cols-3 gap-1">{OutfitPreviews}</div>
      <MainNav></MainNav>
    </>
  );
}
