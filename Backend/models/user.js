const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  age: { type: Number, require: true },
  password: { type: String, require: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Added role field
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
