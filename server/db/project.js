const Sequelize = require('sequelize');
const db = require('./database');

const Project = db.define('project', {
  title: {
    type: Sequelize.STRING,
    validate: { notEmpty: true },
    allowNull: false,
  },
  deadline: {
    type: Sequelize.DATE,
  },
  priority: {
    type: Sequelize.INTEGER,
    validate: { min: 0, max: 10 },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: Sequelize.TEXT('long'),
  },
});

Project.beforeCreate((project, options) => {
  options.individualHooks = true;
  if (project.title === '') {
    throw new Error('Name your title, yo');
  }
  if (!(new Date(project.deadline))) {
    throw new Error ('You need a real deadline')
  }
});

module.exports = Project;
