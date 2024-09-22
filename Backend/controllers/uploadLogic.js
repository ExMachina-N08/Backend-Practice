// controllers/uploadController.js
const Album = require("../models/album");
const Song = require("../models/song");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2; // Using Cloudinary for file storage, you can use any other service
const multer = require("multer");

// Configuration for Cloudinary or any other storage service
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array("songs", 10); // Limit to 10 files at a time

// Upload album with multiple songs
const uploadAlbum = async (req, res) => {
  try {
    // Multer middleware to handle file upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading files", err });
      }

      // Extract album metadata from request body
      const { title, description, genre, releaseDate, artistId } = req.body;

      // Verify artist
      const artist = await User.findById(artistId);
      if (!artist) {
        return res.status(400).json({ message: "Invalid artist" });
      }

      // Create album entry in the database
      const newAlbum = new Album({
        title,
        artist: artistId,
        description,
        genre,
        releaseDate: releaseDate || Date.now(),
      });
      await newAlbum.save();

      // Process each song file
      const songFiles = req.files;
      const songPromises = songFiles.map(async (file) => {
        // Upload file to Cloudinary (or any other service)
        const result = await cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              folder: "songs",
              public_id: `${title}-${file.originalname}`,
            },
            (err, result) => {
              if (err) {
                throw new Error(`Failed to upload song: ${file.originalname}`);
              }
              return result;
            }
          )
          .end(file.buffer);

        // Create song entry in the database
        const newSong = new Song({
          title: file.originalname, // Using file name as song title
          album: newAlbum._id,
          artist: artistId,
          fileUrl: result.secure_url, // Cloudinary URL
          duration: file.duration, // Assuming you get this from the frontend
        });
        await newSong.save();
        newAlbum.songs.push(newSong._id); // Add song to album's song list
        return newSong;
      });

      // Wait for all song uploads to complete
      await Promise.all(songPromises);
      await newAlbum.save();

      res.status(201).json({
        message: "Album and songs uploaded successfully",
        album: newAlbum,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadAlbum };
