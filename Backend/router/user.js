// routes/userRoutes.js
const express = require("express");
const {
  createUser,
  loginUser,
  updateUser,
  patchUser,
  deleteUser,
} = require("../controllers/user");
const authentication = require("../middleware/authentication");

const router = express.Router();

// User registration and login routes
router.post("/register", createUser);
router.post("/login", loginUser);

// User profile routes
router.get("/:id/profile", authentication, async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId).select("username role email name"); // Add fields to select

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const showDetail = req.query.showDetail;
    const message = `Welcome to profile page, User ${user.username}`;
    if (showDetail === "true") {
      return res.status(200).json({ message, role: user.role, user });
    }

    return res.status(200).json({ message });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

// Update and delete user routes
router.put("/:id/profile", authentication, updateUser);
router.patch("/:id/profile", authentication, patchUser);
router.delete("/:id/profile", authentication, deleteUser);

module.exports = router;
