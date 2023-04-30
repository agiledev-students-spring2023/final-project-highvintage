const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Post = require("../schemas/posts.js");
const User = require("../schemas/users.js");
const Style = require("../schemas/styles.js");
const db = require("../db.js");
const { ObjectId } = require("mongodb");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
router.use("/static", express.static("public"));
const uploadDir = path.join(__dirname, "..", "public", "uploads");

router.get("/styles", async (req, res) => {
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
    let styles = fetchedStyles.styles;
    // console.log('* styles', styles)
    res.status(201).json({ styles });
  } catch (err) {
    console.log("Style error:", err);
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
const upload = multer({ storage: storage });

// TODO: file validation

// api/posts/ (outfit posts)
router.post(
  "/create",
  upload.fields([{ name: "my_files", maxCount: 5 }]),
  async (req, res, next) => {
    const user = req.user;
    console.log("user", user);
    const author = user.username;
    console.log("author", author);
    const { location, content, style } = req.body;

    console.log("req.files.my_files", req.files.my_files);

    const photos = req.files.my_files.map((file) => ({
      data: fs.readFileSync(path.join(uploadDir + "/" + file.filename)),
      contentType: file.mimetype,
    }));

    try {
      // create new Post and save
      const newPost = await new Post({
        author: user._id,
        style: style,
        caption: content,
        photos: photos,
        location: location,
      }).save();

      console.log("photos[0]", photos[0]);

      if (newPost) {
        // console.log('* newPost', newPost);
        console.log("* date format", newPost.posted);
        db.collection("Posts").insertOne(newPost);
      } else console.log("* Failed to create post");

      // Populate the author field in the newPost object
      const populatedPost = await Post.populate(newPost, {
        path: "author",
        model: "User",
      });
      user.posts.push(populatedPost._id);

      try {
        await user.save();
        // Populate posts field in User
        const populatedUser = await User.findById(user._id).populate("posts");
        console.log("* Populated User", populatedUser);

        // JUST TO MAKE EASIER TO DELETE.. IF NEEDED
        // await Post.deleteMany({});
        // remove post ids from user.posts array
        // await User.updateMany({}, { $set: { posts: [] } });
      } catch (err) {
        console.log("* Issue saving user", err);
      }

      res
        .status(201)
        .json({ newPost: populatedPost, message: "Successfully posted!" });
    } catch (err) {
      console.log("Error:", err);
      next(err);
    }
  }
);

// error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// api/posts/
router.post("/:postID/like", async (req, res) => {
  const { userID, postID, liked, postLikes } = req.body;
  const user = req.user;
  // console.log('userId', userID)
  // console.log("postId", postID);

  let numLikes = postLikes;
  let isLiked = liked;
  //isLiked true = not liked, since passed in !isLiked
  if (isLiked) {
    //adds user objectID to like array
    try {
      await Post.findByIdAndUpdate(postID, {
        $push: { likes: new ObjectId(user._id) },
      })
        .populate()
        .then((post) => {
          console.log("Likes", post.likes);
        });
    } catch (err) {
      console.log("* Error adding user to like array", err);
    }
  } else {
    //deletes user from like array
    try {
      await Post.findByIdAndUpdate(postID, {
        $pull: { likes: new ObjectId(user._id) },
      });
    } catch (err) {
      console.log("* Error deleting user from like array", err);
    }
  }

  //getting likes data
  await Post.findById(postID)
    .populate()
    .then((post) => {
      numLikes = post.likes.length;
      // Check if the current user has already liked the discussion
      isLiked = post.likes.some((like) => like.equals(user._id));
    })
    .catch((err) => {
      console.error("* Error getting likes length", err);
    });
  // Return the updated number of likes and like state in the response
  res.json({ numLikes, isLiked });
});

//get like status
router.get("/:id/like", async (req, res) => {
  const userID = req.query.userID;
  const postID = req.params.id;

  try {
    const post = await Post.findById(postID);
    const numLikes = post.likes.length;
    //determine if it is liked
    const isLiked = post.likes.some((like) => like.equals(userID));
    res.json({ numLikes, isLiked });
  } catch (err) {
    console.log("* Cannot get initial like state", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// api/posts/
router.get("/collection", async (req, res) => {
  const user = req.user;
  try {
    await User.find()
      .then(async (fetchedUsers) => {
        console.log("* fetchedUsers", fetchedUsers);
        const populatedUsers = await User.findById(user._id).populate("posts");
        console.log("* populatedUsers", populatedUsers);
        let allPosts = [];
        [populatedUsers].forEach((user) => {
          user.posts.forEach((p) => {
            allPosts.push(p);
          });
        });
        console.log("* allPosts", allPosts);
        res.json({ populatedUsers, allPosts });
      })
      .catch((err) => console.log("* Cannot fetch all users", err));
  } catch (err) {
    console.log(err);
  }
});

// api/posts/
router.get("/view", async (req, res) => {
  console.log("FINDING USER", req.user);

  const user = req.user;
  console.log("user", user);
  const author = user.username;
  console.log("author", author);
  console.log("req.query", req.query);
  const postID = req.query.id;
  console.log("postID", postID);

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
router.get("/feed", async function (req, res) {
  if (!req.user) {
    res.sendStatus(403);
  }

  try {
    const populateFollowing = await req.user.populate("following");
  } catch (e) {
    res.sendStatus(500);
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
    const populatePosts = await req.user.populate("posts");
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
