const { default: mongoose } = require("mongoose");

const songSchema = new Schema({
  albumID: { type: Schema.Types.ObjectId, ref: "Album", required: true }, // references the album the song belongs to
  artistID: { type: Schema.Types.ObjectId, ref: "User", required: true }, // references the artist who created the song
  imgID: { type: Schema.Types.ObjectId, ref: "Image" }, // optional image reference
  songName: { type: String, required: true },
  duration: { type: String },
  fileURL: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
});
const Song = mongoose.model("Song", songSchema);
module.exports = Song;
