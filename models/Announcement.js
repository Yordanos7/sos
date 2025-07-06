const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Announcement = sequelize.define("Announcement", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  postedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  },
});

module.exports = Announcement;
// here i just add postDate to the announcement model chuck it if usefullness of it
