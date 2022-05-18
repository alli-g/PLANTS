const Project = require('../db/Project');
const project = require('express').Router();

project.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

module.exports = project;
