import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

const CommentSchema = new Schema({
  type: { type: String, required: true }, // either POST or DISCUSSION
  author: { type: ObjectId, ref: "User", required: true },
  body: { type: String, required: true },
});

export const CommentModel = model("CommentModel", CommentSchema);
