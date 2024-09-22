const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const createError = require("http-errors"); // Import http-errors package
const router = require("./router/user");
const cors = require("cors");
const cloudinary = require("./config/cloudinaryConfig");
//app config
dotenv.config();
const app = express();
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send(`Server is running`);
});
//Enable Cors
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
//middleware

app.use(express.json());

app.use("/api", router);

app.use((req, res, next) => {
  next(createError(404));
});

// Error-handling middleware with four parameters
app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`running on Port ${PORT}`);
});
