import express from "express";
import { v4 as uuidv4 } from "uuid";
import dummyUsers from "../mock-db/mock.mjs";
import dummyPosts from "../mock-db/mock_posts.mjs";

const router = express.Router();

// saving in an array for mock-up purpose, later needs to be replaced using MongoDB
let posts = [];

const createPost = (user, location, content, style) => {
  const id = uuidv4(); // generate a unique id using uuid
  const newPost = {
    id,
    user,
    location,
    content,
    style,
  };
  posts.push(newPost);
  return newPost;
};

router.post("/create", (req, res) => {
  const user = req.user;
  const { location, content, style } = req.body;
  console.log("req.body", req.body);
  const newPost = createPost(user, location, content, style);
  res.status(201).json({ newPost, message: "Successfully posted!" });
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
    return res.json({
      found,
      authorUsername: author.username,
      authorID: author.id,
      authorPhoto: author.photo,
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
