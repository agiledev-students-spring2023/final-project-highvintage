const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const Discussion = require('../schemas/discussions');
const Comment = require('../schemas/comments');
const Post = require('../schemas/posts');

router.get("/view/:postID", async function (req, res) {
  if (!req.params.postID) {
    res.send(500);
  }

  const id = req.params.postID;

  if (req.query.discussionPost) {
    try {
      const post = await Discussion.findOne({ _id: new ObjectId(id) });

      if (!post) {
        return res.status(404).send("Post not found");
      }

      const comments = await Comment.find({ _id: { $in: post.comments } })
        .populate("author", "id photo username")
        .lean();

      const commentsToAppend = comments.map((comment) => ({
        id: comment.author.id,
        photo: comment.author.photo,
        user: comment.author.username,
        body: comment.body,
      }));

      res.send({
        userPhoto: req.user.photo,
        username: req.user.username,
        id: req.user.id,
        comments: commentsToAppend,
      });
    } catch (err) {
      console.error(err);
      return res.status(500);
    }
  }
  if (req.query.photoPost) {
    try {
      const post = await Post.findOne({ _id: new ObjectId(id) });

      if (!post) {
        return res.status(404).send("Post not found");
      }

      const comments = await Comment.find({ _id: { $in: post.comments } })
        .populate("author", "id photo username")
        .lean();

      const commentsToAppend = comments.map((comment) => ({
        id: comment.author.id,
        photo: comment.author.photo,
        user: comment.author.username,
        body: comment.body,
      }));

      res.send({
        userPhoto: req.user.photo,
        username: req.user.username,
        id: req.user.id,
        comments: commentsToAppend,
      });
    } catch (err) {
      console.error(err);
      return res.status(500);
    }
  }
});

router.post("/add", async function (req, res) {
  if (req.body.type === "PHOTO") {
    const findPost = dummyPosts.find((post) => {
      return post.postId === +req.body.postID;
    });
    findPost.comments.push(req.body.comment);

    res.sendStatus(200);
  }

  if (req.body.type === "DISCUSSION") {
    const findPost = await Discussion.findOne({ _id: new ObjectId(id) });

    if (!findPost) {
      return res.status(404).send("Post not found");
    }

    findPost.comments.push(req.body.comment);

    res.sendStatus(200);
  }
});

module.exports = router;
