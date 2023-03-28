import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import UsersRoute from "./routes/users.mjs";
import PostsRoute from "./routes/posts.mjs";

import mockUsers from "./mock-db/mock.mjs";

const PORT = process.env.PORT || 5000;

// adding post author to all mock users
for (const user of mockUsers) {
  for (const post of user.posts) {
    post.author = user.username;
  }
}
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", UsersRoute);
app.use("/api/posts", PostsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
