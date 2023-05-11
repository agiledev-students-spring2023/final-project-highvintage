const express = require("express");
const User = require("../schemas/users.js");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const passport = require("passport");

const uploadDir = path.join(__dirname, "..", "public", "profile_photos");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });
router.post(
  "/upload-profile-photo",
  passport.authenticate("jwt", { session: false }),
  upload.single("photo"),
  async (req, res, next) => {
    const user = req.user;
    const file = req.file;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const fileData = fs.readFileSync(file.path);
      const photo = `data:${file.mimetype};base64,${fileData.toString(
        "base64"
      )}`;
      fs.unlinkSync(file.path);


      user.photo = photo;
      await user.save();

      res.status(200).json({
        photo,
        message: "Profile photo uploaded successfully!",
      });
    } catch (err) {
      console.log("Error:", err);
      next(err);
    }
  }
);

// api/users/
router.get(
  "/profile/:username",
  passport.authenticate("jwt"),
  async function (req, res) {
    // input is cleaned in front end, before call is made
    // no params = error

    if (!req.params) {
      return res.sendStatus(500);
    }
    const username = req.params.username;

    try {
      const findUser = await User.findOne({ username });

      if (findUser) {
        // populate required fields
        await findUser.populate("posts");
        const findFollowers = await findUser.populate("followers");
        const findPosts = await findUser.populate("posts");
        const findDiscussions = await findUser.populate("discussions");

        const checkFollower = findFollowers.followers.find((user) => {
          return user.username === req.user.username;
        });

        const isAFollower = !!checkFollower;

        return res.send({ user: findUser, isFollowing: isAFollower });
      } else {
        return res.sendStatus(404);
      }
    } catch (e) {
      return res.sendStatus(500);
    }
  }
);

router.put(
  "/edit-profile",
  passport.authenticate("jwt"),
  async function (req, res) {
    const toChange = req.body.changes;

    if (toChange.username) {
      // does a user already have an existing username?
      const usernameExists = await User.findOne({
        username: toChange.username,
      });

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
  }
);

router.get("/search", passport.authenticate("jwt"), async function (req, res) {
  // input is cleaned in front end, before call is made

  if (!req.query.query) {
    return res.sendStatus(500);
  }

  const users = await User.find({});

  const found = users.filter((user) => {
    return user.username.includes(req.query.query);
  });

  return res.json({ found });
});

router.get("/me", passport.authenticate("jwt"), async function (req, res) {
  // input is cleaned in front end, before call is made
  if (!req.user) {
    return res.sendStatus(500);
  }

  try {
    const me = await User.findById(req.user._id)
      .populate("posts")
      .populate("discussions");

    return res.json({ user: me });
  } catch (e) {
    return res.sendStatus(500);
  }
});

// api/users/:username/follow
router.post(
  "/:username/follow",
  passport.authenticate("jwt"),
  async function (req, res) {
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
  }
);

// api/users/:username/unfollow
router.post(
  "/:username/unfollow",
  passport.authenticate("jwt"),
  async function (req, res) {
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
  }
);

// get user's followers
router.get(
  "/:username/followers",
  passport.authenticate("jwt"),
  async function (req, res) {
    const username = req.params.username.toLowerCase();

    const user = await User.findOne({ username }).populate({
      path: "followers",
    });

    if (!user) {
      return res.sendStatus(500);
    }

    const response = user.followers.map((follower) => {
      return {
        _id: follower._id,
        username: follower.username,
        photo: follower.photo
          ? follower.photo
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      };
    });

    res.json({ followers: response });
  }
);

// get user's following
router.get(
  "/:username/following",
  passport.authenticate("jwt"),
  async function (req, res) {
    const username = req.params.username.toLowerCase();

    const user = await User.findOne({ username }).populate({
      path: "following",
    });

    if (!user) {
      return res.sendStatus(500);
    }

    const response = user.following.map((following) => {
      return {
        _id: following._id,
        username: following.username,
        photo: following.photo
          ? following.photo
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      };
    });

    return res.json({ following: response });
  }
);

// retrieve username
router.get("/:id", passport.authenticate("jwt"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ username: user.username });
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});
module.exports = router;
