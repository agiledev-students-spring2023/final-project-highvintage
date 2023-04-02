import express from "express";
import dummyUsers from "../mock-db/mock.mjs";
import dummyPosts from "../mock-db/mock_posts.mjs";

const router = express.Router();
// api/posts/
router.put("/save", function (req, res) {
  const user = req.user;
  const postID = req.body.postID;

  console.log("press");

  user.savedPosts.push(postID);
  res.send(200);
});

// api/posts/
router.get("/view", function (req, res) {
  const user = req.user;
  const postID = req.body.postID;

  res.json(dummyPosts);
});
export default router;
