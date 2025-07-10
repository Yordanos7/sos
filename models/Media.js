const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Media = sequelize.define(
  "Media",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.ENUM("image", "video"), allowNull: false },
    title: { type: DataTypes.STRING(200), allowNull: false },
    category: { type: DataTypes.STRING(100), allowNull: true },
    date: { type: DataTypes.DATEONLY, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    url: { type: DataTypes.STRING(255), allowNull: true },
    featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: {
      type: DataTypes.ENUM("published", "draft"),
      defaultValue: "draft",
    },
    duration: { type: DataTypes.STRING(20), allowNull: true }, // for videos
    views: { type: DataTypes.STRING(20), allowNull: true }, // e.g. '15.2K'
    author: { type: DataTypes.STRING(100), allowNull: true },
    thumbnail: { type: DataTypes.STRING(255), allowNull: true },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "User", key: "id" },
    },
  },
  { timestamps: true }
);

module.exports = Media;
