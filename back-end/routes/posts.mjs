import express from "express";

const router = express.Router();
// api/users/
router.put("/save", function (req, res) {
  const user = req.user;
  const postID = req.body.postID;

  user.savedPosts.push(postID);

  res.send(200);
});

export default router;
