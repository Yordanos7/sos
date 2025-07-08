const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).josn({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "12mth",
      }
    );
    res.status(200).josn({
      message: "User created successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: " Internal server error while registering user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .josn({ message: "User not found on the database" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).josn({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12mth" }
    );
    res.status(200).josn({
      message: "User logged in successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).josn({
      message: "Internal server error while logging in the user",
      error: error.messasge,
    });
  }
};

// const User = require("../models/User");

// const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await User.create({ name, email, password });
//     res.status(200).json({ message: "User created successfully", user });
//   } catch (error) {
//     register.status(500).json({
//       message: "Error there is internal server error while registering user",
//       error: error.message,
//     });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ where: { email } });
//   if (!user) {
//     res.status(404).json({ message: "user not found" });
//   }
//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
//   res.status(200).json({ message: "User logged in successfully", user });
// };

// module.exports = { register, login };
