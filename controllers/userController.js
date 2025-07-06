const User = require("../models/User");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "user", "email", "role", "createdAt", "updatedAt"], // here you only have to use array to get the attributes you want not the object
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "sorry user not found on the getProfile controller" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Internale server Error founde on the getProfile controller",
      error: error.message,
    });
  }
};

// you can add updateProfile if it is nessesary  updateProfile.js

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      res.status(404).json({
        message: "User not found to delete it from the deleteUser controller",
      });
    }
    await user.destroy();
    res.status(200).json({
      message: "User deleted successfully from the deleteUser controller",
    });
  } catch (error) {}
};

module.exports = {
  getProfile,
  deleteUser,
};
