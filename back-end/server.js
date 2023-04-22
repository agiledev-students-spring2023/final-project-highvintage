const express = require("express");
// const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const UsersRoute = require("./routes/users.js");
const PostsRoute = require("./routes/posts.js");
const DiscussionsRoute = require("./routes/discussions.js");
const CommentsRoute = require("./routes/comments.js");
const mockUsers = require("./mock-db/mock.js");
const PORT = process.env.PORT || 5000;
const db = require("./db.js");
const User = require("./schemas/users.js");
const Discussion = require("./schemas/discussions.js");
// adding post author to all mock users
for (const user of mockUsers) {
  user.savedPosts = [];
  user.bio = "This is my bio made from the server.js file!";
  user.style = "Server.js";
  user.favoriteThrift = "nodemon server.js";
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

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const oneUser = [];
const set = async function (oneUser) {
  try {
    const user = await User.findOne({ username: "krunker" });
    console.log(user);
    if (user) {
      oneUser.push(user);
      // console.log("user found:", user);
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
set(oneUser);

// middleware to access/manipulate the logged in user!
// in any route, user req.user to get the "logged in " user
const persistUser = function (req, res, next) {
  // req.user = mockUsers[0];
  req.user = oneUser[0];
  next();
};

app.use(persistUser);

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await db.collection("Auth").findOne({ email: email });

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
    const check = await db.collection("Auth").findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await db.collection("Auth").insertMany([data]);
    }
  } catch (e) {
    res.json("notexist");
  }
});

app.get("/api/allUsers", async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

app.get("/api/allDiscussions", async (req, res) => {
  const allDiscussions = await Discussion.find({});
  res.json(allDiscussions);
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

module.exports = app;
