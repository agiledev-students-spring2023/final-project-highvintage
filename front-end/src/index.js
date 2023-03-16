import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Profile from "./pages/Profile";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Contactus from "./pages/Contactus";
import Termsofservice from "./pages/Termsofservice";
import OutfitCollection from "./pages/OutfitCollection";
import OutfitView from "./pages/OutfitView";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/followers" element={<Followers />}></Route>
      <Route path="/following" element={<Following />}></Route>
      <Route path="/contact-us" element={<Contactus />}></Route>
      <Route path="/tos" element={<Termsofservice />}></Route>
      <Route path="/outfit-collection" element={<OutfitCollection />}></Route>
      <Route path="/outfit-view" element={<OutfitView />}></Route>
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
