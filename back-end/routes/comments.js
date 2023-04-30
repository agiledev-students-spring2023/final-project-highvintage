const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const Discussion = require("../schemas/discussions");
const Comment = require("../schemas/comments");
const Post = require("../schemas/posts");

router.get("/view/:postID", async function (req, res) {
  if (!req.params.postID) {
    res.send(500);
  }

  const id = req.params.postID;

  if (req.query.discussionPost) {
    try {
      const post = await Discussion.findOne({ _id: new ObjectId(id) });

      if (!post) {
        return res.status(404);
      }

      const comments = await Comment.find({ _id: { $in: post.comments } })
        .populate("author", "id photo username")
        .lean();

      const commentsToAppend = comments.map((comment) => ({
        id: comment.author._id,
        photo: comment.author.photo,
        user: comment.author.username,
        body: comment.body,
      }));

      res.send({
        userPhoto: req.user.photo,
        username: req.user.username,
        id: req.user._id,
        comments: commentsToAppend,
      });
    } catch (err) {
      return res.status(500);
    }
  }
  if (req.query.photoPost) {
    try {
      const post = await Post.findOne({ _id: new ObjectId(id) });

      if (!post) {
        return res.status(404);
      }

      const comments = await Comment.find({ _id: { $in: post.comments } })
        .populate("author", "id photo username")
        .lean();

      const commentsToAppend = comments.map((comment) => ({
        id: comment.author._id,
        photo: comment.author.photo,
        user: comment.author.username,
        body: comment.body,
      }));

      res.send({
        userPhoto: req.user.photo,
        username: req.user.username,
        id: req.user._id,
        comments: commentsToAppend,
      });
    } catch (err) {
      return res.status(500);
    }
  } else {
    return res.status(500);
  }
});

router.post("/add", async function (req, res) {
  try {
    const { type, postID, comment } = req.body;

    if (!type || !postID || !comment) {
      return res.status(500);
    }

    const newComment = new Comment({
      type: type,
      author: req.user.id,
      body: comment.body,
    });

    try {
      // save the comment to Comment collection
      const savedComment = await newComment.save();

      // update post's comment array
      if (type == "discussion") {
        await Discussion.findByIdAndUpdate(postID, {
          $push: { comments: savedComment._id },
        });
      } else if (type == "photo") {
        await Post.findByIdAndUpdate(postID, {
          $push: { comments: savedComment._id },
        });
      } else {
        return res.sendStatus(500).send("Post type error");
      }
    } catch (err) {
      return res.sendStatus(500);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
