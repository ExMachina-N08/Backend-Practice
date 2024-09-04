// controllers/templateController.js
const Template = require("../models/template");
// const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.submitTemplate = async (req, res) => {
  try {
    // Create a new template entry
    const newTemplate = new Template({
      artistId: req.body.artistId,
      albumName: req.body.albumName,
    });

    // Upload files to Cloudinary and save their URLs in the template
    const fileUploadPromises = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);
      // Add the uploaded file URL to the template
      newTemplate.files.push({
        fileURL: result.secure_url,
        status: "uploaded",
      });
      // Optionally delete the file from local storage after upload
      fs.unlinkSync(file.path);
    });

    await Promise.all(fileUploadPromises);

    // Save the template with uploaded files
    await newTemplate.save();

    res
      .status(200)
      .json({ message: "Template and files submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit template" });
  }
};
