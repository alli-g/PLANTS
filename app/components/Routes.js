import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AllRobots from './AllRobots';
import AllProjects from './AllProjects';
import NavBar from './NavBar';
import SingleRobot from './SingleRobot';
import SingleProject from './SingleProject';

const Routes = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <main>
          <h1>
            Welcome to StackBot Project Management: your robot employees are
            awaiting assignments!
          </h1>
          <Switch>
            <Route exact path="/robots" component={AllRobots} />
            <Route exact path="/robots/:id" component={SingleRobot} />
            <Route exact path="/projects" component={AllProjects} />
            <Route exact path="/projects/:id" component={SingleProject} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
