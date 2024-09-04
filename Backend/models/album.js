const { default: mongoose } = require("mongoose");

const albumSchema = new Schema({
  artistID: { type: Schema.Types.ObjectId, ref: "User", required: true }, // references the artist who created the album
  albumName: { type: String, required: true },
  imgID: { type: Schema.Types.ObjectId, ref: "Image" }, // optional image reference
  imgURL: { type: String },
  files: [{ type: Schema.Types.ObjectId, ref: "Song" }], // array of song references
  status: {
    type: String,
    enum: ["Submitted", "Reviewed", "Published"],
    default: "Submitted",
  },
  timeStamp: { type: Date, default: Date.now },
});
const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
