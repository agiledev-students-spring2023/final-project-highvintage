import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import Index from "./index.js"
import React from "react"
import Signin from "./signin"

function App() {
  return (
    <div className="flex w-full h-screen">
      <Signin />
    </div>
  );
}

export default App;
