const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Vacancy = sequelize.define("Vacancy", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employmentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exprianceLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  minimumSalary: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  maximumSalary: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  applicationDeadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  keyResponsibilities: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  requirments: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  preferredQualifications: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  benefits: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactInformation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Vacancy;
