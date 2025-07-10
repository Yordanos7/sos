const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const News = sequelize.define(
  "News",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING(100), allowNull: true },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high", "urgent"),
      defaultValue: "medium",
    },
    tags: { type: DataTypes.STRING(255), allowNull: true },
    postedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "User", key: "id" },
    },
    postDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    excerpt: { type: DataTypes.STRING(255), allowNull: true },
    attachments: { type: DataTypes.TEXT, allowNull: true }, // JSON string or comma-separated
  },
  { timestamps: true }
);

module.exports = News;
