import express from "express";
import dummyUsers from "../mock-db/mock.mjs";
import dummyDiscussions from "../mock-db/mock_discussions.mjs";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
const upload = multer();

const router = express.Router();

const createDiscussion = (title, content, date, comments) => {
  const id = uuidv4(); // generate a unique id using uuid
  const newDiscussion = {
    id,
    title,
    content,
    date,
    comments,
  };
  dummyDiscussions.push(newDiscussion);
  return newDiscussion;
};

router.post("/create", upload.none(), (req, res, next) => {
  const user = req.user; // needs to be revisited

  const { date, title, content } = req.body;
  const comments = JSON.parse(req.body.comments);
  console.log("req.body", req.body);
  try {
    const newDiscussion = createDiscussion(title, content, date, comments);
    user.discussion.push(newDiscussion);
    newDiscussion.author = user.username;
    res.status(201).json({ newDiscussion, message: "Successfully posted!" });
  } catch (err) {
    next(err);
  }
});
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

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
