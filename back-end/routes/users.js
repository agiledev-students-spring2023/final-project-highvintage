const express = require("express");
const dummyUsers = require("../mock-db/mock.js");
const User = require("../schemas/users.js");
const db = require("../db.js");
const Post = require("../schemas/posts.js");
const router = express.Router();
// api/users/
router.get("/profile/:username", async function (req, res) {
  // input is cleaned in front end, before call is made
  // no params = error

  if (!req.params) {
    return res.sendStatus(500);
  }
  const username = req.params.username;

  const findUser = await User.findOne({ username });

  if (findUser) {
    // populate required fields
    const populatedUser = await findUser.populate("posts");
    const findFollowers = await findUser.populate("followers");

    const checkFollower = findFollowers.followers.find((user) => {
      return user.username === req.user.username;
    });

    const isAFollower = checkFollower ? true : false;

    return res.send({ user: findUser, isFollowing: isAFollower });
  } else {
    return res.sendStatus(404);
  }
});

router.put("/edit-profile", function (req, res) {
  const toChange = req.body.changes;

  if (toChange["username"]) {
    // does a user already have an existing username?
    const usernameExists = dummyUsers.find(
      (user) => user.username === toChange.username
    );

    if (usernameExists) {
      // 409 conflict
      res.status(409).send({ error: "Username already exists." });
    }
  }

  // update req.user
  for (const prop in toChange) {
    req.user[prop] = toChange[prop];
  }

  // update user in mockDB
  const updateIdx = dummyUsers.findIndex((user) => user.id === req.user.id);
  dummyUsers[updateIdx] = req.user;

  res.json({ message: "Profile update was a success!" });
});

router.get("/search", function (req, res) {
  // input is cleaned in front end, before call is made

  if (!req.query.query) {
    return res.sendStatus(500);
  }

  const findUsers = dummyUsers.filter((user) => {
    return user.username.includes(req.query.query);
  });

  return res.json(findUsers);
});

router.get("/me", async function (req, res) {
  // input is cleaned in front end, before call is made

  if (!req.user) {
    res.sendStatus(500);
  }

  // should not send over any passwords in the case
  // that we have to code this with mongodb

  const me = await User.findById(req.user._id)
    .populate("posts")
    .populate("discussions");
  // console.log("Populated", populateUser);

  res.json({ user: me });
});

// api/users/:username/follow
router.put("/:username/follow", async function (req, res) {
  const username = req.params.username;
  const gainedAFollower = await User.findOneAndUpdate(
    { username },
    { $push: { followers: req.user._id } }
  );

  const gainedAFollowing = await User.findOneAndUpdate(
    { username: req.user.username },
    { $push: { following: gainedAFollower._id } }
  );

  res.sendStatus(200);
});

// api/users/:username/unfollow
router.put("/:username/unfollow", async function (req, res) {
  const toLoseFollower = req.params.username;

  const losingAFollower = await User.findOneAndUpdate(
    { username: toLoseFollower },
    { $pull: { followers: req.user._id } }
  );

  const losingAFollowing = await User.findOneAndUpdate(
    { username: req.user.username },
    { $pull: { following: losingAFollower._id } }
  );

  res.sendStatus(200);
});

// get user's followers
router.get("/:username/followers", async function (req, res) {
  const username = req.params.username.toLowerCase();

  const user = await User.findOne({ username }).populate({ path: "followers" });

  if (!user) {
    return res.sendStatus(500);
  }

  const response = user.followers.map((follower) => {
    return {
      username: follower.username,
      photo: follower.photo
        ? follower.photo
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    };
  });

  res.json({ followers: response });
});

// get user's following
router.get("/:username/following", async function (req, res) {
  const username = req.params.username.toLowerCase();

  const user = await User.findOne({ username }).populate({ path: "following" });

  if (!user) {
    return res.sendStatus(500);
  }

  const response = user.following.map((following) => {
    return {
      username: following.username,
      photo: following.photo
        ? following.photo
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    };
  });

  return res.json({ following: response });
});

//retrieve username
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ username: user.username });
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});
module.exports = router;
