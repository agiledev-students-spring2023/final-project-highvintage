import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./swiper.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Profile from "./pages/Profile";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Contactus from "./pages/Contactus";
import Termsofservice from "./pages/Termsofservice";
import OutfitCollection from "./pages/OutfitCollection";
import OutfitForm from "./pages/OutfitForm";
import OutfitView from "./pages/OutfitView";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";

import Home from "./pages/Home";
import Register from "./Register";
import Signin from "./signin";

import DiscussionView from "./pages/DiscussionView";
import ShareDiscussion from "./pages/ShareDiscussion";
import Discussionform from "./pages/Discussionform";
import Comments from "./pages/Comments";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./pages/NotFound";
import GenericErr from "./pages/GenericErr";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/*" element={<NotFound />}></Route>
      <Route path="/404" element={<NotFound />}></Route>
      <Route path="/500" element={<GenericErr />}></Route>

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />}></Route>

        <Route path="/profile/:username" element={<Profile />}></Route>
        <Route path="/followers" element={<Followers />}></Route>
        <Route path="/following" element={<Following />}></Route>
        <Route path="/comments/:postID" element={<Comments />}></Route>
        <Route path="/contact-us" element={<Contactus />}></Route>
        <Route path="/tos" element={<Termsofservice />}></Route>
        <Route path="/outfit-collection" element={<OutfitCollection />}></Route>
        <Route path="/outfit-form" element={<OutfitForm />}></Route>
        <Route path="/outfit-view/:id" element={<OutfitView />}></Route>
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/discussion-view/:id" element={<DiscussionView />}></Route>
        <Route path="/discussion-home" element={<ShareDiscussion />}></Route>
        <Route path="/discussion-form" element={<Discussionform />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
