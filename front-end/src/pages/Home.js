import React from 'react'
import { useState } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from '../components/MainNav';

export default function Home() {
  return (
    <div>
        <GenericHeader pageName = "HighVintage" />

        <MainNav></MainNav>
    </div>
  )
}
