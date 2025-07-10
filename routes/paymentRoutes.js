const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createPayment,
  getPayments,
  updatePayment,
} = require("../controllers/paymentController");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createPayment);
router.get("/", authMiddleware, roleMiddleware("admin"), getPayments);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updatePayment); // you will get error because there is no this controller function in the controllers/paymentController.js file

module.exports = router;
