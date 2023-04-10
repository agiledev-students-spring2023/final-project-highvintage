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
    const likes = [];
    newDiscussion.discussionLike = likes;
    user.discussion.push(newDiscussion);
    dummyDiscussions.push(newDiscussion);
    // console.log("dummyDiscussions", dummyDiscussions);
    res.status(201).json({ newDiscussion, message: "Successfully posted!" });
  } catch (err) {
    next(err);
  }
});
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

router.post("/:id/like", (req, res) => {
  const { userID, discussionID, liked, discussionLikes } = req.body;
  console.log("userId", userID);
  console.log("discussionId", discussionID);
  // Todo: Update the status of the post in the database

  // Get the updated number of likes and like state from the database
  let numLikes = discussionLikes; // get the current number of likes from the database

  if (liked) {
    numLikes++;
  } else {
    numLikes--;
  }

  // Return the updated number of likes and like state in the response
  res.json({ numLikes });
});

// api/users/
router.get("/view/:id", function (req, res) {
  function parseDiscussionID(id) {
    // Check if the id is an integer (using regex to check for integer string)
    if (/^-?\d+$/.test(id)) {
      return parseInt(id, 10); // Parse the integer string to an integer
    }

    // If it's not an integer, return it as a string
    return id;
  }

  const discussionID = parseDiscussionID(req.params.id);
  const found = dummyDiscussions.find((discussion) => {
    //type coericon due to using uuid and normal integer ids.
    return discussion.id == discussionID;
  });
  console.log(found);
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
