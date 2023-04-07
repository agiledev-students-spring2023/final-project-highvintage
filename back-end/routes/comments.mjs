import express from "express";
import dummyUsers from "../mock-db/mock.mjs";
import dummyPosts from "../mock-db/mock_posts.mjs";

const router = express.Router();

// api/comments
router.get("/view/:postID", function (req, res) {
  if (!req.params.postID) {
    res.send(500);
  }

  const id = +req.params.postID;

  const post = dummyPosts.find((post) => {
    return post.postId === id;
  });

  const comments = post.comments;

  const commentsToAppend = [];

  comments.forEach((comment) => {
    const author = dummyUsers.find((user) => user.id === comment.author);
    const body = comment.body;
    commentsToAppend.push({
      id: author.id,
      photo: author.photo,
      user: author.username,
      body,
    });
  });

  res.send({
    userPhoto: req.user.photo,
    username: req.user.username,
    comments: commentsToAppend,
  });
});

export default router;
