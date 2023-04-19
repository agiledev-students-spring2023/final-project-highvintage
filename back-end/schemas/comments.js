const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  type: { type: String, required: true }, // either POST or DISCUSSION
  author: { type: ObjectId, ref: "User", required: true },
  body: { type: String, required: true },
});

const Comment = mongoose.model("Comment", CommentSchema, "Comments");

module.exports = Comment;
