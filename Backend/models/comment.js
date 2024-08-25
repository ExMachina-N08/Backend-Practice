const mongoose = require("mongoose");
const User = require("./user");
const Posts = require("./post");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  postId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Posts",
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
