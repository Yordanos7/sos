const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    const { title, data, description } = req.body;
    const userId = req.user.id;
    const event = await Event.create({
      title,
      data,
      description,
      createdBy: userId,
    });
    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while creating event",
      error: error.message,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();

    res.status(200).json({
      message: "Events retrieved successfully",
      events,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while retrieving events",
      error: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, data, description } = req.body;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found with this ID" });
    }
    event.title = title || event.title;
    event.data = data || event.data;
    event.description = description || event.description;
    await event.save();
    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating event",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      res.status(404).json({ message: "Event not found with this ID" });
    }
    await event.destroy();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while deleting event",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
