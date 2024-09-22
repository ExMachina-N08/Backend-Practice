const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema({
  artistID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  artistName: { type: String },
  albumName: { type: String, required: true },
  albumArtwork: { type: String },
  files: [
    {
      fileName: { type: String },
      fileURL: { type: String },
      status: {
        type: String,
        enum: ["pending", "uploaded"],
        default: "pending",
      },
    },
  ],
  status: {
    type: String,
    enum: ["submitted", "under_review", "approved", "rejected"],
    default: "submitted",
  },
  timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Template", templateSchema);
