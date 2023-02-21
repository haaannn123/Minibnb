"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "userId",
        hooks: true,
        onDelete: 'CASCADE'
      });
      Review.belongsTo(models.Spot, {
        foreignKey: "spotId",
        hooks: true,
        onDelete: 'CASCADE'
       });
      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Review.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
      },
      userId: {
        Type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
      },
      review: {
        Type: DataTypes.STRING,
      },
      stars: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
