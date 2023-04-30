const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  photo: { type: String },
  bio: { type: String, required: true },
  favThrift: { type: String, required: true },
  style: { type: String, required: true },
  posts: [{ type: ObjectId, ref: 'Post' }],
  discussions: [{ type: ObjectId, ref: 'Discussion' }],
  followers: [{ type: ObjectId, ref: 'User' }],
  following: [{ type: ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', UserSchema, 'Users');

module.exports = User;
