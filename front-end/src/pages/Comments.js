import React, { useState } from "react";
import GenericHeader from "../components/GenericHeader";
import { dummyComments } from "../dummy/comments";
import Comment from "../components/Comments/Comment";
import AddComment from "../components/Comments/AddComment";

export default function Comments() {
  const [comments, setComments] = useState(dummyComments);

  const commentComponents = comments.map((comment) => (
    <Comment user={comment.user} key={comment.id} body={comment.body} />
  ));
  return (
    <>
      <GenericHeader pageName="Comments" />

      <section className="mt-16 w-10/12 mr-auto ml-auto">
        {commentComponents}
      </section>

      <AddComment />
    </>
  );
}
