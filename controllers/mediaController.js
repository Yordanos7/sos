const Media = require("../models/Media");
const multer = require("multer");
// here i configure multer for file uploaded
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const createMedia = async (req, res) => {
  try {
    const { type, title, description } = req.body; // here if you need put there category,date,
    const userId = req.user.id;
    const url = req.file ? `uploads/${req.file.filename}` : null;
    if (!url) {
      return res.status(400).json({ message: "File upload failed" });
    }

    const media = await Media.create({
      type,
      title,
      description,
      url,
      uploadedBy: userId,
    });
    res.status(201).json({
      message: "Media created successfully",
      media,
    });
  } catch (error) {
    res.json({
      message: "Internal server error while creating media",
      error: error.message,
    });
  }
};

const getMedia = async (req, res) => {
  try {
    const media = await Media.findAll();
    res.status(200).json({
      message: "Media retrieved successfully",
      media,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while retrieving media",
      error: error.message,
    });
  }
};

const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, description } = req.body;
    const url = req.file ? `uploads/${req.file.filename}` : null;

    const media = await Media.findByPk(id);
    if (!media) {
      return res.status(404).json({ message: "Media not found with this ID" });
    }
    media.type = type || media.type;
    media.title = title || media.title;
    media.description = description || media.description;
    await media.save();
    res.status(200).json({
      message: "Media updated successfully",
      media,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating media",
      error: error.message,
    });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findByPk(id);
    if (!media) {
      return res.status(404).json({ message: "Media not found with this ID" });
    }
    await media.destroy();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while deleting media",
      error: error.message,
    });
  }
};
module.exports = {
  createMedia,
  getMedia,
  updateMedia,
  deleteMedia,
};
