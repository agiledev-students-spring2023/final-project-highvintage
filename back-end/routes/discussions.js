const express = require('express');
const dummyUsers = require('../mock-db/mock.js');
const dummyDiscussions = require('../mock-db/mock_discussions.js');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const upload = multer();

const router = express.Router();

const createDiscussion = (title, content, date, comments) => {
  const id = uuidv4(); // generate a unique id using uuid
  const newDiscussion = {
    id,
    title,
    content,
    date,
    comments,
  };
  return newDiscussion;
};

router.post("/create", upload.none(), (req, res, next) => {
  const user = req.user; // needs to be revisited

  const { date, title, content } = req.body;
  const comments = JSON.parse(req.body.comments);
  console.log("req.body", req.body);
  try {
    const newDiscussion = createDiscussion(title, content, date, comments);
    newDiscussion.author = user.id;
    user.discussion.push(newDiscussion);
    dummyDiscussions.push(newDiscussion);
    res.status(201).json({ newDiscussion, message: "Successfully posted!" });
  } catch (err) {
    next(err);
  }
});
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// api/users/
router.get("/view/:id", function (req, res) {
  const discussionID = +req.params.id;

  const found = dummyDiscussions.find((discussion) => {
    return discussion.id === discussionID;
  });

  if (found) {
    // get author object
    const author = dummyUsers.find((user) => {
      return user.id === found.author;
    });
    // 200 OK
    return res.json({
      found,
      authorUsername: author.username,
      authorID: author.id,
      authorPhoto: author.photo,
    });
  } else {
    // 404 Not Found

    return res.sendStatus(404);
  }
});

module.exports = router;
