const express = require("express");
const dummyUsers = require("../mock-db/mock.js");
const User = require("../schemas/users.js");
const db = require("../db.js");
const Post = require("../schemas/posts.js");
const router = express.Router();
const multer = require("multer");

// storage for user's profile photos
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profile_photos");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const uploadProfile = multer({ storage: profileStorage });

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

router.post(
  "/upload-profile-photo",
  uploadProfile.single("profile_photo"),
  async (req, res, next) => {
    const user = req.user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Update the user's profile photo URL
    const photoURL = `/profile_photos/${file.filename}`;

    try {
      user.photo = photoURL;
      await user.save();
      res.status(200).json({
        photoURL: photoURL,
        message: "Profile photo uploaded successfully!",
      });
    } catch (err) {
      console.log("Error:", err);
      next(err);
    }
  }
);

router.put("/edit-profile", async function (req, res) {
  const toChange = req.body.changes;

  if (toChange["username"]) {
    // does a user already have an existing username?
    const usernameExists = await User.findOne({ username: toChange.username });

    if (usernameExists) {
      // 409 conflict
      return res.status(409).send({ error: "Username already exists." });
    }
  }

  // update user in the database
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, toChange, {
      new: true,
    });

    res.json({ message: "Sucessfully updated profile", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
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

  req.user = gainedAFollowing;

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

  req.user = losingAFollowing;

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
