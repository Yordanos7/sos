const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      Model: User,
      key: "id",
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    defaultValue: "pending",
  },
  paymentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentFile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Payment;

// here i add paymentFile addtionaly chuck it to the payment model
