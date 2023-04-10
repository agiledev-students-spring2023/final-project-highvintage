const express = require('express');
const dummyUsers = require('../mock-db/mock.js');
const dummyPosts = require('../mock-db/mock_posts.js');
const dummyDiscussions = require('../mock-db/mock_discussions.js');

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
      comments: commentsToAppend,
    });
  }
});

module.exports = router;

