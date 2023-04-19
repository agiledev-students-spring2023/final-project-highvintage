const express = require("express");
const dummyUsers = require("../mock-db/mock.js");
const User = require("../schemas/users.js");
const db = require("../db.js");
const router = express.Router();
// api/users/
router.get("/profile", function (req, res) {
  // input is cleaned in front end, before call is made
  // no params = error

  if (!req.query) {
    return res.sendStatus(500);
  }

  const foundUser = dummyUsers.find(
    (user) => user.username == req.query.username.toLowerCase()
  );

  if (!foundUser) {
    return res.json({ status: 401, message: "Unknown User ID" });
  } else {
    return res.json({
      status: 200,
      user: {
        isSelf: req.user.username == req.query.username,
        profilePicture: foundUser.photo,
        style: "Streetwear",
        favoriteThrift: "L Train Vintage",
        bio: "I love clothes!",
        username: foundUser.username,
        posts: foundUser.posts,
        discussion: foundUser.discussion,
        followers: foundUser.followers,
        following: foundUser.following,
      },
    });
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

router.get("/me", function (req, res) {
  // input is cleaned in front end, before call is made

  if (!req.user) {
    res.sendStatus(500);
  }

  // should not send over any passwords in the case
  // that we have to code this with mongodb
  res.json({ user: req.user });
});

// api/users/:username/follow
router.put("/:username/follow", function (req, res) {
  const currentUser = dummyUsers.find(
    (user) => user.username === req.user.username.toLowerCase()
  );
  const toFollow = dummyUsers.find(
    (user) => user.username === req.params.username.toLowerCase()
  );

  if (!currentUser || !toFollow) {
    return res.json({ status: 401, message: "Unknown User ID" });
  }

  if (!currentUser.following.includes(toFollow.id)) {
    currentUser.following.push(toFollow.id);
    toFollow.followers.push(currentUser.id);
  }

  return res.json({
    status: 200,
    message: "User followed successfully",
    user: toFollow,
  });
});

// api/users/:username/unfollow
router.put("/:username/unfollow", function (req, res) {
  const currentUser = dummyUsers.find(
    (user) => user.username === req.user.username
  );
  const toUnfollow = dummyUsers.find(
    (user) => user.username === req.params.username
  );

  if (!currentUser || !toUnfollow) {
    return res.json({ status: 401, message: "Unknown User ID" });
  }

  if (currentUser.following.includes(toUnfollow.id)) {
    currentUser.following = currentUser.following.filter(
      (id) => id !== toUnfollow.id
    );
    toUnfollow.followers = toUnfollow.followers.filter(
      (id) => id !== currentUser.id
    );
  }

  return res.json({
    status: 200,
    message: "User unfollowed successfully",
    user: toUnfollow,
  });
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
router.get("/:username/following", function (req, res) {
  const foundUser = dummyUsers.find(
    (user) => user.username === req.params.username.toLowerCase()
  );

  if (!foundUser) {
    return res.json({ status: 401, message: "Unknown User ID" });
  }

  const following = foundUser.following.map((followingId) => {
    return dummyUsers.find((user) => user.id === followingId);
  });

  // returning what's needed for profile preview component
  return res.json({
    status: 200,
    following: following.map((following) => {
      return {
        username: following.username,
        photo: following.photo,
      };
    }),
  });
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
