const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  deleteUser,
} = require("../controllers/userController;");
const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile); // you will get  error because there is no this controller function in the controllers/userController.jsfile
router.delete("/profile", authMiddleware, deleteUser);
