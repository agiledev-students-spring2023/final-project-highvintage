import { model, Schema } from "mongoose";

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }, // reference to author
  caption: { type: String, required: true },
  // photos
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posted: { type: Date, required: true },
  location: { type: String, required: true },
});

export const Post = model("Post", PostSchema);
