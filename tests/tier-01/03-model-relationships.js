const { expect } = require('chai');
const { db } = require('../../server/db');
const seed = require('../../seed');
const { Robot, Project } = require('../../server/db');

describe('Tier One: Project >-< Robot Association', () => {
  before(() => db.sync({ force: true }));
  afterEach(() => db.sync({ force: true }));

  describe('Sequelize Models', () => {
    xit('a project may belong to many robots', async () => {
      const r2d2 = await Robot.create({ name: 'R2-D2' });
      const wallE = await Robot.create({ name: 'WALL-E' });
      const projectLove = await Project.create({ title: 'Discover love' });
      await projectLove.addRobots([r2d2, wallE]);
      const lovingRobots = await projectLove
        .getRobots()
        .map((robot) => robot.name);
      expect(lovingRobots).to.deep.equal(['R2-D2', 'WALL-E']);
    });

    xit('a robot may belong to many projects', async () => {
      const openPodBayDoors = await Project.create({
        title: 'Open the pod bay doors',
      });
      const makePizza = await Project.create({ title: 'Make pizza' });
      const hal9000 = await Robot.create({ name: 'HAL-9000' });
      await hal9000.addProjects([openPodBayDoors, makePizza]);
      const hal9000sProjects = await hal9000
        .getProjects()
        .map((title) => title.title);
      expect(hal9000sProjects).to.deep.equal([
        'Open the pod bay doors',
        'Make pizza',
      ]);
    });
  });

  describe('Seed File', () => {
    let robots, projects;
    beforeEach(async () => {
      await seed();
      robots = await Robot.findAll({ include: [Project] });
      projects = await Project.findAll({ include: [Robot] });
    });

    xit('creates at least one robot that has no projects', () => {
      const robotsWithNoProjects = robots
        .filter((robot) => !robot.projects.length)
        .map((robot) => robot.name);
      expect(robotsWithNoProjects).to.have.lengthOf.above(0);
    });

    xit('creates at least one project that has no robots', () => {
      const projectsWithNoRobots = projects
        .filter((project) => !project.robots.length)
        .map((project) => project.title);
      expect(projectsWithNoRobots).to.have.lengthOf.above(0);
    });

    xit('*** creates at least one robot that has several projects', () => {
      throw new Error('replace this error with your own test');
    });

    xit('*** creates at least one project that has several robots', () => {
      throw new Error('replace this error with your own test');
    });
  });
});
