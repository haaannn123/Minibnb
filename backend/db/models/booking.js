"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        hooks: true,
        onDelete: 'CASCADE'
     });
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        hooks: true,
        onDelete: 'CASCADE'
      });
    }
  }
  Booking.init(
    {
      spotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
