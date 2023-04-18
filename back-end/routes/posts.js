const express = require('express');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const dummyUsers = require('../mock-db/mock.js');
const dummyPosts = require('../mock-db/mock_posts.js');
const Post = require('../schemas/posts.js');
const User = require('../schemas/users.js');
const db = require('../db.js');
const PostCollection = db.collection("Posts");
const UserCollection = db.collection("Users");

const router = express.Router();
router.use("/static", express.static("public"));

// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../back-end/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

// api/posts/ (outfit posts)
router.post(
  "/create",
  upload.fields([{ name: "my_files", maxCount: 5 }]),
  async (req, res, next) => {
    const user = req.user; // temporarily 'krunker' obj
    console.log('req.user', user)
    const author = user.username;
    console.log('author', author) // krunker
    const files = req.files.my_files; // array of photo(s)
    console.log('files', files);
    const { location, content, style } = req.body;
    // console.log("req.body", req.body);

    // save array of photo paths in Post Schema
    const photoPaths = [];
    files.forEach((f) => {
      // console.log('* f.path',f.path)
      photoPaths.push(f.path)
    })
    console.log('* photoPaths', photoPaths);

    try {
      // create new Post and save
      const newPost = await new Post(
        {
          author: user._id,
          style: style,
          caption: content,
          photos: photoPaths,
          location: location
        }
      ).save();

      if (newPost) {
        console.log('* newPost', newPost);
        console.log('* date format', newPost.posted);
      } else (
        console.log('* Failed to create post')
      )

      // Populate the author field in the newPost object
      const populatedPost = await Post.populate(newPost, { path: "author", model: "User" });
      user.posts.push(populatedPost);

      try {
        await user.save();
        // Populate posts field in User
        const populatedUser = await User.findById(user._id).populate("posts");
        console.log('* Populated User', populatedUser);
      } catch (err) {
        console.log('* Issue saving user', err);
      }

      res.status(201).json({ newPost: populatedPost, message: "Successfully posted!" });
    } catch (err) {
      console.log('Error:', err);
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
  // Todo: Update the like status of the post in the database

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
router.put("/save", function (req, res) {
  const user = req.user;
  const postID = req.body.postID;

  user.savedPosts.push(postID);
  res.sendStatus(200);

  // todo: 404 error if resource not found
});

// api/posts/
router.get("/view/:id", async (req, res) => {
  const postID = +req.params.id;
  console.log('postID', postID)
  // const found = await Post.findOne({ _id: new ObjectId(postID) });
  const found = dummyPosts.find((post) => {
    return post.postId === postID;
  });

  if (found) {
    // get author object
    const author = dummyUsers.find((user) => {
      return user.id === found.author;
    });
    // const author = await User.findOne({ _id: found.author });
    // 200 OK
    const post = found;
    post.authorPhoto = author.photo;
    post.authorUsername = author.username;
    post.postLoc = post.postLoc ? post.postLoc : " ";

    return res.json({
      post
    });
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