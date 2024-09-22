const { default: mongoose } = require("mongoose");

const albumSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the artist who uploaded the album
  description: { type: String },
  releaseDate: { type: Date, default: Date.now },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }], // Array of song references
  coverImageUrl: { type: String }, // URL for the album cover image
  genre: { type: String },
});
const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
