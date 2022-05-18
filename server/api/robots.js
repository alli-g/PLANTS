const Robot = require('../db/Robot');
const robot = require('express').Router();

//api/robots

robot.get('/', async (req, res, next) => {
  try {
    const robots = await Robot.findAll();
    res.json(robots);
  } catch (err) {
    next(err);
  }
});

module.exports = robot;
