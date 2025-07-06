const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const News = sequelize.define("News", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNUll: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNUll: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNUll: true,
  },
  postedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

module.exports = News;
