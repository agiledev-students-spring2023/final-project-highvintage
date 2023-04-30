const express = require("express");
const dummyUsers = require("../mock-db/mock.js");
const dummyDiscussions = require("../mock-db/mock_discussions.js");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const Discussion = require("../schemas/discussions.js");
const User = require("../schemas/users.js");
const upload = multer();
const db = require("../db.js");
const router = express.Router();
const { ObjectId } = require("mongodb");

router.post("/create", upload.none(), async (req, res, next) => {
  const user = req.user; // needs to be revisited
  const { date, title, content } = req.body;
  try {
    // Create a new discussion instance
    const newDiscussion = new Discussion({
      author: user._id,
      title: title,
      content: content,
      comments: [],
      likes: [],
      posted: date,
    });
    //save the new discussion to the database
    await newDiscussion.save();

    const populatedDiscussion = await Discussion.populate(newDiscussion, {
      path: "author",
      model: "User",
    });
    user.discussions.push(populatedDiscussion._id);
    await user.save();
    res.status(201).json({ newDiscussion, message: "Successfully posted!" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:id/like", async (req, res) => {
  const { userID, discussionID, liked, discussionLikes } = req.body;

  const user = req.user;
  //finds user performing like
  try {
    const likeUser = await User.findById(user._id);
  } catch (err) {
    // TODO
    console.log("* Cannot find user performing like", err);
  }

  let performLike = liked;
  let numLikes = discussionLikes;
  //isLiked true = not liked, since passed in !isLiked
  if (performLike) {
    //adds user objectID to like array
    try {
      await Discussion.findByIdAndUpdate(discussionID, {
        $push: { likes: new ObjectId(user._id) },
      }).populate();
    } catch (err) {
      // TO DO
      console.log("* Error adding user to like array", err);
    }
  } else {
    //deletes user from like array
    try {
      await Discussion.findByIdAndUpdate(discussionID, {
        $pull: { likes: new ObjectId(user._id) },
      });
    } catch (err) {
      // TO DO
      console.log("* Error deleting user from like array", err);
    }
  }
  //getting likes data
  await Discussion.findById(discussionID)
    .populate()
    .then((discussion) => {
      numLikes = discussion.likes.length;
      // Check if the current user has already liked the discussion
      isLiked = discussion.likes.some((like) => like.equals(user._id));
    })
    .catch((err) => {
      console.error("* Error getting likes length", err);
    });
  // Return the updated number of likes and like state in the response
  res.json({ numLikes, isLiked: performLike });
});
//initial like state
router.get("/:id/like", async (req, res) => {
  const userID = req.query.userID;
  const discussionID = req.params.id;
  const user = req.user;

  try {
    const discussion = await Discussion.findById(discussionID);
    const numLikes = discussion.likes.length;
    //determine if it is liked
    const isLiked = discussion.likes.some((like) => like.equals(user._id));
    res.json({ numLikes, isLiked });
  } catch (err) {
    console.log("* Cannot get initial like state", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// api/users/
router.get("/view/:id", async (req, res) => {
  try {
    const discussionID = req.params.id;
    const found = await Discussion.findById(discussionID);
    if (found) {
      // get author object
      const author = await User.findOne({ _id: found.author });
      // 200 OK
      return res.json({
        found,
        authorUsername: author.username,
        authorID: author._id,
        authorPhoto: author.photo,
      });
    } else {
      // 404 Not Found

      return res.sendStatus(404).json({ message: "Discussion not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
