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
  console.log("user:", user);
  const { date, title, content } = req.body;
  // const comments = JSON.parse(req.body.comments);
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
    if(newDiscussion){
    await newDiscussion.save();
    }else console.log("* Failed to create discussion");

    const populatedDiscussion = await Discussion.populate(newDiscussion, {path : "author", model: "User",})
    user.discussions.push(populatedDiscussion._id);
   
    // console.log("dummyDiscussions", dummyDiscussions);
    res.status(201).json({ newDiscussion, message: "Successfully posted!" });
  } catch (err) {
    next(err);
  }
  try{
  await user.save();
 
  }catch(err){
    console.log("* Issue saving user", err);
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
router.get("/view/:id", async (req, res) => {
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
      // authorPhoto: author.photo,
    });
  } else {
    // 404 Not Found

    return res.sendStatus(404);
  }
});

module.exports = router;
