const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  author: { type: ObjectId, ref: 'User', required: true }, // reference to author
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [{ type: ObjectId, ref: 'Comment' }],
  likes: [{ type: ObjectId, ref: 'User' }],
  posted: { type: Date, required: true }
});

const Discussion = mongoose.model('Discussion', DiscussionSchema, 'Discussions');

module.exports = Discussion;
