const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Media = sequelize.define("Media", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM("image", "video"),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false, // what if it were image does this mater?
  },
  uploadedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernces: {
      model: "User",
      key: "id",
    },
  },
});

module.exports = Media;
