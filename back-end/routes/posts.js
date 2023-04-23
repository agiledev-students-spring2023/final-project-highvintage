const express = require("express");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dummyUsers = require("../mock-db/mock.js");
const dummyPosts = require("../mock-db/mock_posts.js");
const Post = require("../schemas/posts.js");
const User = require("../schemas/users.js");
const db = require("../db.js");

const router = express.Router();
router.use("/static", express.static("public"));
const uploadDir = path.join(__dirname, "..", "public", "uploads");

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

      console.log('photos[0]', photos[0]);

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
router.post("/:postID/like", (req, res) => {
  const { userID, postID, liked, postLikes } = req.body;
  const user = req.user;
  // console.log('userId', userID)
  // console.log("postId", postID);

  // TODO: Update the like status of the post in the database
  
  // Get the updated number of likes and like state from the database
  let numLikes = postLikes; // get the current number of likes from the database

  if (liked) {
    numLikes++;
  } else {
    numLikes--;
  }

  // Return the updated number of likes and like state in the response
  res.json({ numLikes });
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
  console.log('req.query', req.query);
  const postID = req.query.id;
  console.log("postID", postID);

  const foundPost = await Post.findOne({ _id: postID });

  if (foundPost) {
    const post = {
      ...foundPost.toObject(),
      authorPhoto: user.photo,
      authorUsername: user.username,
      postLoc: foundPost.location || " ",
      date: foundPost.posted
    };
    return res.json({ post });
  } else {
    // 404 Not Found
    return res.sendStatus(404);
  }
});

// api/posts/
router.get("/feed", function (req, res) {
  // check if req.user exists

  // curate feed from who the user follows
  const following = req.user.following;

  const gatherFollowing = dummyUsers.filter(
    (user) => following.indexOf(user.id) !== -1
  );

  const feedPosts = [];

  for (const user of gatherFollowing) {
    for (const post of user.posts) {
      post.authorPhoto = user.photo;
      post.authorUsername = user.username;
      post.postLoc = post.postLoc ? post.postLoc : " ";
      feedPosts.push(post);
    }
  }

  // should be sorted

  res.json(feedPosts);
});

module.exports = router;
