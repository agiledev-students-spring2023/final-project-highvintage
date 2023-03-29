import express from "express";
import dummyUsers from "../mock-db/mock.mjs";

const router = express.Router();
// api/users/
router.get("/:username", function (req, res) {
  // input is cleaned in front end, before call is made
  const foundUser = dummyUsers.find(
    (user) => user.username == req.params.username.toLowerCase()
  );

  if (!foundUser) {
    return res.json({ status: 401, message: "Unknown User ID" });
  } else {
    return res.json({
      status: 200,
      user: {
        isSelf: req.user.username == req.params.username,
        profilePicture: foundUser.photo,
        style: "Streetwear",
        favoriteThrift: "L Train Vintage",
        bio: "I love clothes!",
        username: foundUser.username,
        posts: foundUser.posts,
        discussion: foundUser.discussion,
        followers: foundUser.followers,
        following: foundUser.following,
      },
    });
  }
});

export default router;
