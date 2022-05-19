const Project = require('../db/project');
const project = require('express').Router();
const Robot = require('../db/robot');

project.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

project.get('/:id', async (req, res, next) => {
  try {
    const oneProj = await Project.findAll({
      where: { id: req.params.id },
      include: [{ model: Robot }],
    });
    res.json(oneProj);
  } catch (error) {
    next(error);
  }
});

project.post('/', async (req, res, next) => {
  try {
    const newProject = await Project.create(req.body);
    res.send(newProject);
  } catch (error) {
    next(error);
  }
});

module.exports = project;
