import express from "express";
import dummyUsers from "../mock-db/mock.mjs";
import dummyPosts from "../mock-db/mock_posts.mjs";

const router = express.Router();
// api/users/
router.get("/:username/discussion/:discussionId", (req, res) => {
  const { username, discussionId } = req.params;
  const foundUser = dummyUsers.find(
    (user) => user.username == username.toLowerCase()
  );
  //currently only handling one discussion per user, may need to add discussion.find in future for multiple discussions under one user
  if (!foundUser) {
    return res.json({ status: 401, message: "Unknown User ID" });
  }else {
    return res.json({
      status: 200,
      user: {
        photo: foundUser.photo,
        username: foundUser.username,
        discussion: foundUser.discussion,
      },
    });
  }
    
  }
  
);

export default router;
