import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  // profile photo
  bio: { type: String, required: true },
  favThrift: { type: String, required: true },
  style: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  discussion: [{ type: Schema.Types.ObjectId, ref: "Discussion" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const User = model("User", UserSchema);
