import express from "express";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";
import dummyUsers from "../mock-db/mock.mjs";
import dummyPosts from "../mock-db/mock_posts.mjs";

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

// saving in an array for mock-up purpose, later needs to be replaced using MongoDB
let posts = [];
const createPost = (author, postLoc, postText, style, postMedia) => {
  const postId = uuidv4(); // generate a unique id using uuid
  const newPost = {
    postId,
    author,
    postLoc,
    postText,
    style,
    postMedia,
    // date
  };
  posts.push(newPost);
  return newPost;
};

// api/posts/ (outfit posts)
router.post(
  "/create",
  upload.fields([{ name: "my_files", maxCount: 5 }]),
  (req, res, next) => {
    const user = req.user; // needs to be revisited
    const author = user.username;
    const files = req.files;
    const { location, content, style } = req.body;
    console.log("req.body", req.body);
    try {
      const newPost = createPost(
        author,
        location,
        content,
        style,
        files,
        // date
      );
      user.posts.push(newPost);
      console.log("user", user);
      // console.log('newPost.author',newPost.author)
      res.status(201).json({ newPost, message: "Successfully posted!" });
    } catch (err) {
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
  console.log('userId', userID)
  console.log("postId", postID);
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
router.get("/view/:id", function (req, res) {
  const postID = +req.params.id;

  const found = dummyPosts.find((post) => {
    return post.postId === postID;
  });

  if (found) {
    // get author object
    const author = dummyUsers.find((user) => {
      return user.id === found.author;
    });
    // 200 OK
    const post = found;
    post.authorPhoto = author.photo;
    post.authorUsername = author.username;
    post.postLoc = post.postLoc ? post.postLoc : " ";

    return res.json({
      post,
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

export default router;
