const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contact = sequelize.define("Contact", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM("faq", "office"),
    allowNull: false,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Contact;

// here come backend chuck it if usefullness of the model
