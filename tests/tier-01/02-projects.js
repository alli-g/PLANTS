/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import waitForExpect from 'wait-for-expect';
import { Provider } from 'react-redux';
import * as rrd from 'react-router-dom';

const { MemoryRouter } = rrd;

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
  projects: [],
};

import mockAxios, { anHourFromNow } from '../mock-axios';
import { setProjects, fetchProjects } from '../../app/redux/projects';

import appReducer from '../../app/redux';
import { createStore } from 'redux';
import store from '../../app/store';

const app = require('../../server');
const agent = require('supertest')(app);

const { db } = require('../../server/db');
const { Project } = require('../../server/db');
const seed = require('../../seed');

/* NOTE: Make sure you pay attention to the paths below. This is where your React components should live! */
import AllProjects, {
  AllProjects as UnconnectedAllProjects,
} from '../../app/components/AllProjects';
import AllRobots from '../../app/components/AllRobots';
import Routes from '../../app/components/Routes';

describe('Tier One: Projects', () => {
  // We'll use this array of projects as dummy data for testing purposes
  const projects = [
    { id: 1, title: 'Build barn', description: 'Lorem Ipsum' },
    { id: 2, title: 'Discover love', completed: true, deadline: anHourFromNow },
    { id: 3, title: 'Open the pod bay doors', priority: 10 },
  ];
  beforeEach(() => {
    // mockAxios ensures that when our client-side code requests data from the
    // server, the request is always successful (even if we haven't implemented)
    // our server yet.
    mockAxios.onGet('/api/projects').replyOnce(200, projects);
  });

  describe('<AllProjects /> component', () => {
    const getProjectsSpy = sinon.spy();
    afterEach(() => {
      getProjectsSpy.resetHistory();
    });

    // This test is interested in the unconnected AllProjects component. It is
    // exported as a named export in app/components/AllProjects.js
    xit('renders the projects passed in as props', () => {
      const wrapper = mount(
        <UnconnectedAllProjects
          projects={projects}
          getProjects={getProjectsSpy}
        />
      );
      expect(wrapper.text()).to.include('Build barn');
      expect(wrapper.text()).to.include('Discover love');
      expect(wrapper.text()).to.include('Open the pod bay doors');
    });

    xit('renders DIFFERENT projects passed in as props', () => {
      const differentProjects = [
        {
          id: 4,
          title: 'Fold the laundry',
        },
        {
          id: 5,
          title: 'Shut down all the garbage compactors',
        },
      ];
      const wrapper = mount(
        <UnconnectedAllProjects
          projects={differentProjects}
          getProjects={getProjectsSpy}
        />
      );
      expect(wrapper.text()).to.include('Fold the laundry');
      expect(wrapper.text()).to.include('Shut down all the garbage compactors');
    });

    xit('*** renders "No Projects" if passed an empty array of projects or if projects is undefined', () => {
      throw new Error('replace this error with your own test');
    });

    // In a later step, we'll create a thunk, and map that thunk to AllProjects
    // as getProjects. For right now, we just need to be sure the component
    // calls it after it mounts.
    xit('calls this.props.getProjects after mount', async () => {
      mount(
        <UnconnectedAllProjects
          projects={projects}
          getProjects={getProjectsSpy}
        />
      );
      await waitForExpect(() => {
        expect(getProjectsSpy).to.have.been.called;
      });
    });
  });

  describe('Redux', () => {
    let fakeStore;
    beforeEach(() => {
      fakeStore = mockStore(initialState);
    });
    describe('set/fetch projects', () => {
      xit('setProjects action creator', () => {
        expect(setProjects(projects)).to.deep.equal({
          type: 'SET_PROJECTS',
          projects,
        });
      });

      xit('fetchProjects thunk creator returns a thunk that GETs /api/projects', async () => {
        await fakeStore.dispatch(fetchProjects());
        const [getRequest] = mockAxios.history.get;
        expect(getRequest).to.not.equal(undefined);
        expect(getRequest.url).to.equal('/api/projects');
        const actions = fakeStore.getActions();
        expect(actions[0].type).to.equal('SET_PROJECTS');
        expect(actions[0].projects).to.deep.equal(projects);
      });
    });
    describe('projects reducer', () => {
      // Pay attention to where the store is being created, namely
      // app/redux/index.js. Once you've created your reducer, ensure that
      // it's actually being used by the redux store.
      let testStore;
      beforeEach(() => {
        testStore = createStore(appReducer);
      });

      xit('*** returns the initial state by default', () => {
        throw new Error('replace this error with your own test');
      });

      xit('reduces on SET_PROJECTS action', () => {
        const action = { type: 'SET_PROJECTS', projects };

        const prevState = testStore.getState();
        testStore.dispatch(action);
        const newState = testStore.getState();

        expect(newState.projects).to.be.deep.equal(projects);
        expect(newState.projects).to.not.be.equal(prevState.projects);
      });
    });
  });

  describe('Connect: react-redux', () => {
    // This test is expecting your component to dispatch a thunk after it mounts
    // Remember that getProjects prop from an earlier test? Now's a good time
    // for a mapDispatch.
    xit('initializes projects from the server when the application loads the /projects route', async () => {
      const reduxStateBeforeMount = store.getState();
      expect(reduxStateBeforeMount.projects).to.deep.equal([]);
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/projects']}>
            <AllProjects />
          </MemoryRouter>
        </Provider>
      );
      await waitForExpect(() => {
        const reduxStateAfterMount = store.getState();
        expect(reduxStateAfterMount.projects).to.deep.equal(projects);
      });
    });

    // This test is expecting your component to render the projects from the
    // Redux store. Now's a good time for a mapState.
    xit('<AllProjects /> renders projects from the Redux store', async () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/projects']}>
            <AllProjects />
          </MemoryRouter>
        </Provider>
      );
      await waitForExpect(() => {
        wrapper.update();

        const { projects: reduxProjects } = store.getState();
        reduxProjects.forEach((reduxProject) => {
          expect(wrapper.text()).to.include(reduxProject.title);
        });
      });
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      sinon.stub(rrd, 'BrowserRouter').callsFake(({ children }) => {
        return <div>{children}</div>;
      });
    });
    afterEach(() => {
      rrd.BrowserRouter.restore();
    });

    // This test expects that you've set up a Route for AllProjects.
    // You should take a look at app/components/Routes.js
    xit('renders <AllProjects /> at path /projects', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/projects']}>
            <Routes />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(AllProjects)).to.have.length(1);
      expect(wrapper.find(AllRobots)).to.have.length(0);
    });

    xit('*** navbar has links to "/projects"', () => {
      throw new Error('replace this error with your own test');
    });
  });

  describe('Express API', () => {
    // Let's test our Express routes WITHOUT actually using the database.
    // By replacing the findAll methods on the Project and Robot models
    // with a spy, we can ensure that our API tests won't fail just because
    // our Sequelize models haven't been implemented yet.
    const { findAll: projectFindAll } = Project;
    beforeEach(() => {
      Project.findAll = sinon.spy(() => Promise.resolve(projects));
    });
    afterEach(() => {
      Project.findAll = projectFindAll;
    });

    // Consider writing your GET route in server/api/projects.js. And don't
    // forget to apply the express router to your API in server/api/index.js!
    xit('GET /api/projects responds with all projects', async () => {
      const response = await agent.get('/api/projects').expect(200);
      expect(response.body).to.deep.equal(projects);
      expect(Project.findAll.calledOnce).to.be.equal(true);
    });
  });

  describe('Sequelize Model', () => {
    let project;
    const fakeDeadline = new Date(2020, 12, 31);
    before(() => db.sync({ force: true }));
    beforeEach(() => {
      project = {
        title: 'Make pizza',
        deadline: fakeDeadline,
        priority: 9,
        completed: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      };
    });
    afterEach(() => db.sync({ force: true }));

    xit('has fields title, deadline, priority, completed, description', async () => {
      project.notARealAttribute = 'does not compute';
      const savedProject = await Project.create(project);
      expect(savedProject.title).to.equal('Make pizza');
      expect(savedProject.priority).to.equal(9);
      expect(savedProject.completed).to.equal(false);
      expect(savedProject.deadline.toString()).to.equal(
        fakeDeadline.toString()
      );
      expect(savedProject.description).to.equal(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      );
      expect(savedProject.notARealAttribute).to.equal(undefined);
    });

    xit('title cannot be null', async () => {
      const blankProject = Project.build();
      try {
        await blankProject.validate();
        throw Error('validation should have failed without title');
      } catch (err) {
        expect(err.message).to.contain('title cannot be null');
      }
    });

    xit('title cannot be empty', async () => {
      const emptyTitleProject = Project.build({ title: '' });
      try {
        await emptyTitleProject.validate();
        throw Error('validation should have failed with empty title');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on title failed');
      }
    });

    xit('*** deadline must be a valid date', () => {
      throw new Error('replace this error with your own test');
    });

    xit('priority must be an integer between 1 and 10', async () => {
      project.priority = 15;

      const highPriority = Project.build(project);
      try {
        await highPriority.validate();
        throw Error('validation should have failed with too high priority');
      } catch (err) {
        expect(err.message).to.contain('Validation max on priority failed');
      }

      project.priority = 0;
      const lowPriority = Project.build(project);
      try {
        await lowPriority.validate();
        throw Error('validation should have failed with too low priority');
      } catch (err) {
        expect(err.message).to.contain('Validation min on priority failed');
      }
    });

    xit('completed is false by default', () => {
      const projectNoCompleted = Project.build({
        title: 'Clean campus',
        priority: 5,
      });
      expect(projectNoCompleted.completed).to.be.a('boolean');
      expect(projectNoCompleted.completed).to.equal(false);
    });
  });

  describe('Seed File', () => {
    // Once you've set up the Project Sequelize model, it's a good time to seed
    // the database with some dummy data. Go edit seed.js. Note that the tests
    // run the seed file on the TEST database. When you're ready to interact
    // with the application in the browser, remember to "npm run seed" from the
    // command line.
    beforeEach(seed);

    xit('populates the database with at least three projects', async () => {
      const seedProjects = await Project.findAll();
      expect(seedProjects).to.have.lengthOf.at.least(3);
    });
  });
});
