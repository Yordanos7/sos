const { Model } = require("sequelize");
const Announcement = require("../models/Announcement");

const createAnnouncement = async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const userId = req.userId.id; // this line of code is write to  get the userId from the request object, assuming userId is set in middleware

    const announcement = await Announcement.create({
      title,
      body,
      category,
      postedBy: userId,
    });

    res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    res.status(500).json({
      message: " Internal server error while creating announcement",
      error: error.message,
    });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll();
    res.status(200).json({
      message: "Announcements retrieved successfully",
      announcements,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while retrieving announcements",
      error: error.message,
    });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    await announcement.destroy();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while deleting announcement",
    });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, category } = req.body;
    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      return res
        .status(404)
        .json({ message: "Announcement not found with this ID you provided" });
    }

    // here is the code for seting the update for the data
    announcement.title = title || announcement.title;
    announcement.title = body || announcement.body;
    announcement.category = category || announcement.category;
    await announcement.save();

    res.status(200).json({
      message: "Announcement updated successfully",
      announcement,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating announcement",
      error: error.message,
    });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};
