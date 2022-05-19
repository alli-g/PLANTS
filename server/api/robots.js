const Robot = require('../db/robot');
const robot = require('express').Router();
const Project = require('../db/project');

//api/robots

robot.get('/', async (req, res, next) => {
  try {
    const robots = await Robot.findAll();
    res.json(robots);
  } catch (err) {
    next(err);
  }
});

robot.get('/:id', async (req, res, next) => {
  try {
    const oneRobot = await Robot.findAll({
      where: { id: req.params.id },
      include: [{ model: Project }],
    });
    // const robot1 = await Robot.findByPk(req.params.id);
    // res.json(robot1);
    res.json(oneRobot);
  } catch (error) {
    next(error);
  }
});

robot.post('/', async (req, res, next) => {
  try {
    const newRobot = await Robot.create(req.body);
    res.send(newRobot);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

module.exports = robot;
