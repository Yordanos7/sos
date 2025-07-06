const Vacancy = require("../models/Vacancy");

const createVacancy = async (req, res) => {
  try {
    const { title, description } = req.body; // you may add department, location,employmentType,exprianceLevel,componsation, jobDescription,responsibilities, requirements,hiremanger,contact,phonenumber no benifits held as there in frontend
    const userId = req.user.id;

    const vacancy = await Vacancy.create({
      title,
      description,
      postedBy: userId,
    });

    res.status(201).json({ message: "Vacancy created successfully", vacancy });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating vacancy", error: error.message });
  }
};

const getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.findAll();
    res.status(200).json(vacancies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching vacancies", error: error.message });
  }
};

const updateVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const vacancy = await Vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }

    vacancy.title = title || vacancy.title;
    vacancy.description = description || vacancy.description;
    await vacancy.save();

    res.status(200).json({ message: "Vacancy updated successfully", vacancy });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating vacancy", error: error.message });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancy = await Vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    await vacancy.destroy();
    res.status(200).json({ message: "Vacancy deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting vacancy", error: error.message });
  }
};

module.exports = { createVacancy, getVacancies, updateVacancy, deleteVacancy };
