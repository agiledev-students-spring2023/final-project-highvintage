const express = require("express");
const dummyUsers = require("../mock-db/mock.js");
const dummyDiscussions = require("../mock-db/mock_discussions.js");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const Discussion = require("../schemas/discussions.js");
const upload = multer();

const router = express.Router();

router.post("/create", upload.none(), async (req, res, next) => {
  const user = req.user; // needs to be revisited
  console.log("user:", user);
  const { date, title, content } = req.body;
  const comments = JSON.parse(req.body.comments);
  try {
    // Create a new discussion instance
    const newDiscussion = new Discussion({
      author: user._id,
      title: title,
      content: content,
      comments: comments,
      likes: [],
      posted: date,
    });
    //save the new discussion to the database
    await newDiscussion.save();

    console.log("newDiscussion", newDiscussion);
    user.discussion.push(newDiscussion);
    await user.save();
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
