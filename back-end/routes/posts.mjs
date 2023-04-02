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
export default router;
