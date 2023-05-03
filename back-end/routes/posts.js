const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Post = require("../schemas/posts.js");
const User = require("../schemas/users.js");
const Style = require("../schemas/styles.js");
const db = require("../db.js");
const { ObjectId } = require("mongodb");
const passport = require("passport");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.use("/static", express.static("public"));
const uploadDir = path.join(__dirname, "..", "public", "uploads");

router.get("/styles", passport.authenticate("jwt"), async (req, res) => {
  console.log(req.user);
  try {
    const fetchedStyles = await new Style({
      styles: [
        "All",
        "Sporty & Athleisure",
        "Streetwear",
        "Classic",
        "Funk",
        "Minimal",
        "Other",
      ],
    }).save();
    const styles = fetchedStyles.styles;
    res.status(201).json({ styles });
  } catch (err) {
    res.sendStatus(500);
  }
});

// enable file uploads saved to disk in a directory named 'public/uploads'
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

// api/posts/ (outfit posts)
router.post(
  "/create",
  upload.fields([{ name: "my_files", maxCount: 5 }]),

  passport.authenticate("jwt"),

  [
    // express-validator checks
    body("location").notEmpty().withMessage("Location is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("style").notEmpty().withMessage("Style is required"),
    body("my_files")
      .custom((value, { req }) => {
        if (!req.files || !req.files.my_files) {
          throw new Error("At least one photo is required");
        }
        return true;
      })
      .withMessage("At least one photo is required"),
  ],

  async (req, res, next) => {
    const user = req.user;
    const { location, content, style } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const photos = req.files.my_files.map((file) => ({
      data: fs.readFileSync(path.join(uploadDir + "/" + file.filename)),
      contentType: file.mimetype,
    }));

    try {
      // create new Post and save
      const newPost = await new Post({
        author: user._id,
        style,
        caption: content,
        photos,
        location,
      }).save();

      if (newPost) {
        db.collection("Posts").insertOne(newPost);
      } else {
        console.log("err3");
        return res.sendStatus(500);
      }

      // Populate the author field in the newPost object
      const populatedPost = await Post.populate(newPost, {
        path: "author",
        model: "User",
      });

      try {
        // Populate posts field in User
        const update = await User.findById(req.user._id).populate("posts");
        req.user.posts.push(populatedPost._id);

        // JUST TO MAKE EASIER TO DELETE.. IF NEEDED
        // await Post.deleteMany({});
        // remove post ids from user.posts array
        // await User.updateMany({}, { $set: { posts: [] } });
      } catch (err) {
        console.log("err2");
        return res.sendStatus(500);
      }

      return res.status(201).json({ newPost: populatedPost });
    } catch (err) {
      console.log("err1");
      res.sendStatus(500);
      next(err);
    }
  }
);

// get like status
router.get("/:id/like", passport.authenticate("jwt"), async (req, res) => {
  const userID = req.query.userID;
  const postID = req.params.id;

  try {
    const post = await Post.findById(postID);

    const numLikes = post.likes.length;
    // determine if it is liked
    const isLiked = post.likes.some((like) => like.equals(userID));

    res.json({ numLikes, isLiked });
  } catch (err) {
    res.sendStatus(500);
  }
});

// api/posts/
router.post("/:postID/like", passport.authenticate("jwt"), async (req, res) => {
  const { postID, liked, postLikes } = req.body;
  const user = req.user;

  let numLikes = postLikes;
  let isLiked = liked;

  // isLiked true = not liked, since passed in !isLiked
  if (isLiked) {
    // adds user objectID to like array
    try {
      await Post.findByIdAndUpdate(postID, {
        $push: { likes: new ObjectId(user._id) },
      })
        .populate()
        .then((post) => {
          console.log("+ Likes", post.likes.length);
        });
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    // deletes user from like array
    try {
      await Post.findByIdAndUpdate(postID, {
        $pull: { likes: new ObjectId(user._id) },
      }).then((post) => {
        console.log("- Likes", post.likes.length);
      });
    } catch (err) {
      res.sendStatus(500);
    }
  }

  // getting likes data
  try {
    await Post.findById(postID)
      .populate()
      .then((post) => {
        numLikes = post.likes.length;
        // Check if the current user has already liked the discussion
        isLiked = post.likes.some((like) => like.equals(user._id));
      });
    // Return the updated number of likes and like state in the response
    res.json({ numLikes, isLiked });
  } catch (err) {
    res.sendStatus(500);
  }
});

// api/posts/
router.get("/collection", passport.authenticate("jwt"), async (req, res) => {
  try {
    // Fetch all users
    const fetchedUsers = await User.find({});

    // Populate posts for each user and create an array of all posts
    const allPosts = [];
    for (const user of fetchedUsers) {
      const populatedUser = await User.findById(user._id).populate("posts");
      allPosts.push(...populatedUser.posts);
    }

    console.log("* allPosts", allPosts);
    res.json({ allPosts });
  } catch (err) {
    console.log("* Cannot fetch all users and their posts", err);
    res.sendStatus(500);
  }
});

// api/posts/
router.get("/view", passport.authenticate("jwt"), async (req, res) => {
  const user = req.user;
  const postID = req.query.id;

  try {
    const foundPost = await Post.findOne({ _id: postID });
    if (foundPost) {
      const post = {
        ...foundPost.toObject(),
        authorPhoto: user.photo,
        authorUsername: user.username,
        postLoc: foundPost.location || " ",
        date: foundPost.posted,
        postText: foundPost.caption,
      };
      return res.json({ post });
    } else {
      // 404 Not Found
      return res.sendStatus(404);
    }
  } catch (e) {
    return res.sendStatus(500);
  }
});

// api/posts/
router.get("/feed", passport.authenticate("jwt"), async function (req, res) {
  if (!req.user) {
    return res.sendStatus(403);
  }

  try {
    await req.user.populate("following");
  } catch (e) {
    return res.sendStatus(500);
  }

  const postsToDisplay = [];

  req.user.following.forEach((user) =>
    user.posts.forEach((post) => postsToDisplay.push(post))
  );

  const feed = [];

  try {
    for (const post of postsToDisplay) {
      const putInFeed = await Post.findById(post).populate("author");
      feed.push(putInFeed);
    }
  } catch (e) {
    return res.sendStatus(500);
  }

  try {
    await req.user.populate("posts");
  } catch (e) {
    return res.sendStatus(500);
  }

  for (const myPost of req.user.posts) {
    try {
      const addMyPostToFeed = await Post.findById(myPost._id).populate(
        "author"
      );
      feed.push(addMyPostToFeed);
    } catch (e) {
      return res.sendStatus(500);
    }
  }

  const sorted = feed.sort(function (a, b) {
    return new Date(b.posted) - new Date(a.posted);
  });

  res.json({ feed: sorted });
});

module.exports = router;
