const { green, red } = require('chalk');
const { db, Project, Robot } = require('./server/db');

const robot = [
  {
    name: 'Penny',
    fuelType: 'electric',
    fuelLevel: 89,
  },
  {
    name: 'Ruby',
    fuelLevel: 75.2,
    imageUrl:
      'https://i.rtings.com/assets/products/hDY0yjPL/irobot-roomba-i7-plus/design-medium.jpg',
  },
  {
    name: 'Rosey',
    fuelType: 'diesel',
    imageUrl:
      'https://cdn.zmescience.com/wp-content/uploads/2014/08/the-jetsons-rosie.gif',
  },
];

const project = [
  {
    title: 'PuppyBowl',
    deadline: '2022-07-17',
    priority: 1,
    description: 'Complete old HW',
  },{
    title: 'Get side tables',
    deadline: '2022-07-01',
    priority: 7,
    description: 'Scour offerup, for cute items',
  },
  {
    title: 'Climb outside',
    deadline: '2022-06-01',
    priority: 1,
    description: 'Get outside during ASYNC week',
  },
];

const seed = async () => {
  try {
    // seed your database here!
    await db.sync({ force: true });
    await Promise.all(
      robot.map((rbt) => {
        return Robot.create(rbt);
      })
    );
    await Promise.all(
      project.map((prj) => {
        return Project.create(prj);
      })
    );
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
