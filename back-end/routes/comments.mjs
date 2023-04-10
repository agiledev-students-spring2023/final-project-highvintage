import express from "express";
import dummyUsers from "../mock-db/mock.mjs";
import dummyPosts from "../mock-db/mock_posts.mjs";
import dummyDiscussions from "../mock-db/mock_discussions.mjs";

const router = express.Router();

// api/comments
router.get("/view/:postID", function (req, res) {
  if (!req.params.postID) {
    res.send(500);
  }

  const id = +req.params.postID;

  if (req.query.discussionPost) {
    const post = dummyDiscussions.find((post) => {
      return post.id === id;
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
      id: req.user.id,
      comments: commentsToAppend,
    });
  }
  if (req.query.photoPost) {
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
      id: req.user.id,
      comments: commentsToAppend,
    });
  }
});

router.post("/add", function (req, res) {
  if (req.body.type === "photo") {
    const findPost = dummyPosts.find((post) => {
      return post.postId === +req.body.postID;
    });
    findPost.comments.push(req.body.comment);

    res.sendStatus(200);
  }

  if (req.body.type === "discussion") {
    const findPost = dummyDiscussions.find((post) => {
      return post.id === +req.body.postID;
    });

    findPost.comments.push(req.body.comment);

    res.sendStatus(200);
  }
});

export default router;
