// controllers/templateController.js
const Template = require("../models/template");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.submitTemplate = async (req, res) => {
  try {
    // Create a new template entry
    const newTemplate = new Template({
      artistID: req.body.artistID,
      albumName: req.body.albumName,
    });

    // Handle album artwork upload
    if (req.files.artwork) {
      const artworkResult = await cloudinary.uploader.upload(
        req.files.artwork[0].path
      );
      newTemplate.albumArtwork = artworkResult.secure_url; // Store the artwork URL in the template

      // Optionally delete the local file after upload
      fs.unlinkSync(req.files.artwork[0].path);
    }

    // Handle song files upload
    const fileUploadPromises = req.files.songs.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);

      // Add file's information to the template
      newTemplate.files.push({
        fileName: file.originalname,
        fileURL: result.secure_url,
        status: "uploaded",
      });

      // Optionally delete the local file after upload
      fs.unlinkSync(file.path);
    });

    await Promise.all(fileUploadPromises);

    // Save the template with uploaded files and artwork
    await newTemplate.save();

    res
      .status(200)
      .json({ message: "Template and files submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit template" });
  }
};
