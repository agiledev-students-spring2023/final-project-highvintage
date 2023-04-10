import express from "express";
import session from "express";
import bodyParser from "body-parser";
import cors from "cors";
import UsersRoute from "./routes/users.mjs";
import PostsRoute from "./routes/posts.mjs";
import DiscussionsRoute from "./routes/discussions.mjs";
import CommentsRoute from "./routes/comments.mjs";
import mockUsers from "./mock-db/mock.mjs";
const PORT = process.env.PORT || 5000;

import { createRequire } from "module";
const require = createRequire(import.meta.url);
// adding post author to all mock users
for (const user of mockUsers) {
  user.savedPosts = [];
  user.bio = "This is my bio made from the server.mjs file!";
  user.style = "Server.mjs";
  user.favoriteThrift = "nodemon server.mjs";
  if (!user.followers) {
    user.followers = [];
    user.following = [];
  }
  for (const post of user.posts) {
    post.author = user.id;
    if (!post.postLoc) {
      post.postLoc = "";
    }
  }
  //store user.id as discussion author
  for (const discussion of user.discussion) {
    discussion.author = user.id;
  }
}

const app = express();
const collection = require("./mongo.js");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware to access/manipulate the logged in user!
// in any route, user req.user to get the "logged in " user
const persistUser = function (req, res, next) {
  req.user = mockUsers[0];
  next();
};

app.use(persistUser);

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("notexist");
  }
});

app.get("/api/dummyUsers", (req, res) => {
  res.json(mockUsers);
});

app.use("/api/users", UsersRoute);
app.use("/api/posts", PostsRoute);
app.use("/api/discussions", DiscussionsRoute);
app.use("/api/comments", CommentsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// export for testing
export default app;
