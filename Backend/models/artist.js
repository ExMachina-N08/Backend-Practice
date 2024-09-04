const { default: mongoose } = require("mongoose");

const artistSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "artist" },
});
const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
