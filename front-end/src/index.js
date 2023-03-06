import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Contactus from "./pages/Contactus";
import OutfitCollection from "./pages/OutfitCollection";
import Termsofservice from "./pages/Termsofservice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/followers" element={<Followers />}></Route>
      <Route path="/following" element={<Following />}></Route>
      <Route path="/contactus" element = {<Contactus />}></Route>
      <Route path="/termsofservice" element = {<Termsofservice />}></Route>
      <Route path="/outfit-collection" element = {<OutfitCollection />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
