const { default: mongoose } = require("mongoose");

const songSchema = new Schema({
  title: { type: String, required: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: "Album", required: true }, // Reference to the album
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the artist
  duration: { type: Number }, // Duration in seconds
  fileUrl: { type: String, required: true }, // URL of the song file
  coverImageUrl: { type: String }, // URL of the cover image for the song
  genre: { type: String },
});
const Song = mongoose.model("Song", songSchema);
module.exports = Song;
