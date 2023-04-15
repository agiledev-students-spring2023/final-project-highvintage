const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: { type: ObjectId, ref: "User", required: true }, // reference to author
  caption: { type: String, required: true },
  // photos
  comments: [{ type: ObjectId, ref: "Comment" }],
  likes: [{ type: ObjectId, ref: "User" }],
  posted: { type: Date, required: true },
  location: { type: String, required: true },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
