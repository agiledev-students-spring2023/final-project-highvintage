import React, { useState } from "react";
import GenericHeader from "../components/GenericHeader";
import { dummyUsers } from "../dummy/users";
import DiscussionFullView from "../components/Saved/DiscussionFullView";

export default function DiscussionView(props) {
  const [user, setUser] = useState(dummyUsers);

  return (
    <>
      <GenericHeader pageName="View Discussion"></GenericHeader>
      <br></br>
      {/* Currently displaying the first dummy discussion */}
      <DiscussionFullView
        title={user[0].discussion[0].title}
        photo={user[0].photo}
        content={user[0].discussion[0].content}
        username={user[0].username}
        date={user[0].discussion[0].date}
      ></DiscussionFullView>

      {/* comment component goes here */}
    </>
  );
}
