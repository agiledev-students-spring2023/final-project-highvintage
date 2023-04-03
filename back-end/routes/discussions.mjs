import express from "express";
import dummyUsers from "../mock-db/mock.mjs";
import dummyDiscussions from "../mock-db/mock_discussions.mjs";


const router = express.Router();

let discussions = [];
const createDiscussion = (user, title, content) => {
  const id = uuidv4(); // generate a unique id using uuid
  const newDiscussion = {
    id,
    user,
    title,
    content,
  };
  discussions.push(newDiscussion);
  return newDiscussion;
};

router.post("/create", (req, res, next) => {
  const user = req.user; // needs to be revisited
  const { title, content } = req.body;
  console.log("req.body", req.body);
  try {
    const newDiscussion = createDiscussion(user, title, content);
    res.status(201).json({ newDiscussion, message: "Successfully posted!" });
  } catch (err) {
    next(error);
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
