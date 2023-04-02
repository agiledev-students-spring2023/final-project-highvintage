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
  for (const discussion of user.discussion){
    discussion.author = user.id;
  }
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// middleware to access/manipulate the logged in user!
// in any route, user req.user to get the "logged in " user
const persistUser = function (req, res, next) {
  req.user = mockUsers[0];
  next();
};

app.use(persistUser);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/api/dummyUsers', (req, res) => {
  res.json(mockUsers);
});

app.use("/api/users", UsersRoute);
app.use("/api/posts", PostsRoute);
app.use("/api/discussions", DiscussionsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
