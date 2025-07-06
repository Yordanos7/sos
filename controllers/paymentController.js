const { json } = require("sequelize");
const Payment = require("../models/Payment");
const User = require("../models/User");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Data.now()}- ${file.originalname}`);
  },
});
const upload = multer({ storage });

const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;
    const fileUrl = req.file ? `uploads/${req.file.filename}` : null;

    const payment = await Payment.create({
      userId,
      amount,
      status: "pending",
      fileUrl,
    });
    res.status(201).json({
      message: "Payment created successfully",
      payment,
      userId,
      fileUrl,
    });
  } catch (error) {
    res.status(500),
      json({
        message:
          "you have an error on the createPayment controller internal sever error",
        error: error.message,
      });
  }
};

const getPayments = async (req, res) => {
  try {
    const payment = await Payment.find({
      include: {
        model: User,
        attributes: ["id", "user", "email"],
      },
    });
  } catch (error) {}
};

// here i leave not woking updatePayment controller

const deletePayment = async (req, res) => {
  try {
    const { id } = req.paramsl;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res
        .status(404)
        .json({ message: "There is no payment held with this ID" });
    }
    await payment.destroy();
    res
      .status(200)
      .json({ message: "Payment deleted successfully from the database" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createPayment,
  getPayments,
  deletePayment,
};
