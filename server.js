const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const contactRoutes = require("./routes/contactRoutes");
const eventRoutes = require("./routes/eventRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const newsRoutes = require("./routes/newsRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const vacancyRoutes = require("./routes/vacancyRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express(); // this is to create an express app to handle HTTP requests
// all the middlewareS are seted here undre bro!
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // and this is to parse the request body

// this is to create fild to set up for the uploads
app.use("/uploads", express.static("uploads"));

// and here i set the routes for the app

app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/vacancies", vacancyRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" }, err.message);
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(
        `Server running on port ${PORT} at ${new Date().toLocaleString(
          "en-US",
          { timeZone: "EAT" }
        )}`
      )
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
