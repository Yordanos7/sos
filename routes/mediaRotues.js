const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createMedia,
  getMedia,
  updateMedia,
  deleteMedia,
} = require("../controllers/mediaController");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getMedia);
router.post("/", authMiddleware, createMedia);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateMedia);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteMedia);

module.express = router;
