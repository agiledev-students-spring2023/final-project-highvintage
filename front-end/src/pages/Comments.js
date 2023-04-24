import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import GenericHeader from "../components/GenericHeader";
import Comment from "../components/Comments/Comment";
import AddComment from "../components/Comments/AddComment";
import axios from "axios";
import { requestURL } from "../requestURL";

export default function Comments(props) {
  const [comments, setComments] = useState([]);
  const [userPhoto, setUserPhoto] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState(0);

  const params = useParams();

  const toFetch = useLocation().search;

  useEffect(() => {
    async function fetchComments(query) {
      const response = await axios.get(
        requestURL + "comments/view/" + query + toFetch
      );
      setComments(response.data.comments);
      setUserPhoto(response.data.userPhoto);
      setUserName(response.data.username);
      setUserID(response.data.id);
    }

    async function fetchMe() {
      const response = await axios.get(requestURL + "users/me");
      const user = response.data.user;
      setUserID(user._id);
      setUserName(user.username);
      setUserPhoto(
        user.photo
          ? user.photo
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
      );
    }

    fetchMe();
    fetchComments(params.postID);

    return () => {};
  }, []);

  const commentComponents = comments.map((comment, idx) => (
    <Comment
      username={comment.user}
      body={comment.body}
      photo={comment.photo}
      id={comment.id}
      key={idx}
    />
  ));
  return (
    <>
      <GenericHeader pageName="Comments" />

      <section className="mt-16 w-10/12 mr-auto ml-auto">
        {comments.length > 0 ? (
          commentComponents
        ) : (
          <p className="text-center mt-24">
            {" "}
            No comments on this post. Be the first to comment!
          </p>
        )}
      </section>

      <AddComment
        type={toFetch.includes("photo") ? "photo" : "discussion"}
        id={userID}
        photo={userPhoto}
        username={userName}
        postID={params.postID}
      />
    </>
  );
}
