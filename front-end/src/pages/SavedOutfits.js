import React, { useState } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import SavedHeader from "../components/Saved/SavedHeader";

export default function SavedOutfits() {
  return (
    <>
      <GenericHeader pageName="Saved"></GenericHeader>
      <SavedHeader pageName="Outfits"></SavedHeader>
      <div className="grid grid-cols-1 gap-3 my-1 mt-2 mb-16">
      </div>
      <MainNav></MainNav>
    </>
  );
}
