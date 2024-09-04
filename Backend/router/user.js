const express = require("express");
const {
  createUser,
  loginUser,
  updateUser,
  patchUser,
  deleteUser,
} = require("../controllers/user");
const authentication = require("../middleware/authentication");
const isAdmin = require("../middleware/isAdmin");
const { getAllUsers } = require("../controllers/getAllUser");
const { createAdmin, loginAdmin } = require("../controllers/admin");
const {
  createPost,
  getPostWithComments,
} = require("../controllers/postInteraction");
const router = express.Router();

// Public routes

// Home route
router.use("/api", (req, res) => {
  res.send("Welcome to the home route!");
});

// User routes
router.post("/user/register", createUser);
router.post("/user/login", loginUser);

// Admin routes
router.post("/admin/register", createAdmin);
router.post("/admin/login", loginAdmin);

// Protected routes

// User profile (only accessible by authenticated users)
router.get("/:id/profile", authentication, (req, res) => {
  const showDetail = req.query.showDetail;
  const message = `Welcome to profile page, User ${req.user.username}`;
  if (showDetail === "true") res.status(200).json({ message });
});

// Update the entire user (PUT)
router.put("/:id/profile", authentication, updateUser);

// Update parts of the user (PATCH)
router.patch("/:id/profile", authentication, patchUser);

// Delete user (DELETE)
router.delete("/:id/profile", authentication, deleteUser);

//create post
router.post("/:id/post", authentication, createPost);

//get post comment
router.get("/:id/post/:postId", authentication, getPostWithComments);

// Admin dashboard (only accessible by authenticated admin users)
router.get("/admin/dashboard", authentication, isAdmin, (req, res) => {
  res.status(200).json({ message: `Welcome, Admin User: ${req.user.email}` });
});

// Admin route to get all users (only accessible by authenticated admin users)
router.get("/admin/users", authentication, isAdmin, getAllUsers);

module.exports = router;
