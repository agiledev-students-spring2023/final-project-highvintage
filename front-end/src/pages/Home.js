import React from 'react'
import { useState } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from '../components/MainNav';
import OutfitPost from '../components/OutfitPost/OutfitPost'


export default function Home() {
  return (
    <div>
        <GenericHeader pageName = "HighVintage"></GenericHeader>
        
        
        <div className="mt-20 mb-20 flex flex-col items-start justify-center items-center space-y-4">
            <OutfitPost></OutfitPost>
            <OutfitPost></OutfitPost>
            <OutfitPost></OutfitPost>
        </div>
        
        <MainNav/>
    </div>
  )
}
