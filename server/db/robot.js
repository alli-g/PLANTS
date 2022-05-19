const Sequelize = require('sequelize');
const db = require('./database');

const Robot = db.define('robot', {
  name: {
    type: Sequelize.STRING,
    validate: { notEmpty: true },
    allowNull: false,
  },
  fuelType: {
    type: Sequelize.ENUM('gas', 'diesel', 'electric'),
    defaultValue: 'electric',
  },
  fuelLevel: {
    type: Sequelize.DOUBLE,
    validate: { min: 0, max: 100 },
    defaultValue: 100,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://media.istockphoto.com/vectors/cute-white-robot-character-vector-vector-id1187576166?s=612x612',
  },
});

Robot.beforeCreate((robot, options) => {
  if (robot.fuelType !== ('gas' || 'diesel' || 'electric')) {
    robot.fuelType = 'electric';
  } else if (robot.name === null) {
    throw new Error('You have to name your robot!');
  } else if (robot.fuelLevel === null) {
    robot.fuelLevel = 100;
  } else if (robot.imageUrl === null) {
    robot.imageUrl =
      'https://media.istockphoto.com/vectors/cute-white-robot-character-vector-vector-id1187576166?s=612x612';
  }
});

module.exports = Robot;
