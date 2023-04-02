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
