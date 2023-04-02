import express from "express";
import dummyUsers from "../mock-db/mock.mjs";

const router = express.Router();
// api/users/
router.get("/profile", function (req, res) {
  // input is cleaned in front end, before call is made
  // no params = error

  if (!req.query) {
    return res.sendStatus(500);
  }

  const foundUser = dummyUsers.find(
    (user) => user.username == req.query.username.toLowerCase()
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

router.get("/search", function (req, res) {
  // input is cleaned in front end, before call is made

  console.log("click!");

  if (!req.query.query) {
    return res.sendStatus(500);
  }

  const findUsers = dummyUsers.filter((user) => {
    console.log(user.username);
    return user.username.includes(req.query.query);
  });

  return res.json(findUsers);
});

export default router;
