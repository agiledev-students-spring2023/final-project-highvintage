import { model, Schema } from "mongoose";

const DiscussionSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }, // reference to author
  content: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posted: { type: Date, required: true },
  // date
});

export const Discussion = model("Discussion", DiscussionSchema);
