import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SelfProfile from "./pages/SelfProfile";
import Profile from "./pages/Profile";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Contactus from "./pages/Contactus";
import Termsofservice from "./pages/Termsofservice";
import OutfitCollection from "./pages/OutfitCollection";
import OutfitView from "./pages/OutfitView";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";
import SavedDiscussion from "./pages/Saveddiscussion";
import DiscussionView from "./pages/DiscussionView";
import ShareDiscussion from "./pages/ShareDiscussion";
import Discussionform from "./pages/Discussionform"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path ="/self" element={<SelfProfile />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/followers" element={<Followers />}></Route>
      <Route path="/following" element={<Following />}></Route>
      <Route path="/contact-us" element={<Contactus />}></Route>
      <Route path="/tos" element={<Termsofservice />}></Route>
      <Route path="/outfit-collection" element={<OutfitCollection />}></Route>
      <Route path="/outfit-view" element={<OutfitView />}></Route>
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/saved-discussion" element = {<SavedDiscussion />}></Route>
      <Route path="/discussion-view" element = {<DiscussionView/>}></Route>
      <Route path="/share-discussion" element = {<ShareDiscussion/>}></Route>
      <Route path="/discussion-form" element = {<Discussionform/>}></Route>
      </Routes>
     
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
