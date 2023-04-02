import express from "express";
import dummyUsers from "../mock-db/mock.mjs";
import dummyDiscussions from "../mock-db/mock_discussions.mjs";


const router = express.Router();
// api/users/
router.get("/view/:id", function (req, res) {
  const discussionID = +req.params.id;

  const found = dummyDiscussions.find((discussion) => {
    return discussion.id === discussionID;
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
