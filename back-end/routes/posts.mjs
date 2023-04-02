import express from "express";
import dummyUsers from "../mock-db/mock.mjs";
import dummyPosts from "../mock-db/mock_posts.mjs";

const router = express.Router();
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
  const user = req.user;

  const postID = +req.params.id;

  const found = dummyPosts.find((post) => {
    return post.postId === postID;
  });

  if (found) {
    // 200 OK
    return res.json(found);
  } else {
    // 404 Not Found
    return res.sendStatus(404);
  }
});
export default router;
