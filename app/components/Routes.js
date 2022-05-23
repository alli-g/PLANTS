import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AllRobots from './AllRobots';
import AllProjects from './AllProjects';
import NavBar from './NavBar';
import SingleRobot from './SingleRobot';
import SingleProject from './SingleProject';
import NewRobot from './NewRobot';
import NewProject from './NewProject';
import UpdateProject from './UpdateProject';
import UpdateRobot from './UpdateRobot';
import MainPage from './Main';

const Routes = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/" component={MainPage} />

            <Route exact path="/robots" component={AllRobots} />
            <Route exact path="/robots/create" component={NewRobot} />
            <Route exact path="/robots/:id" component={SingleRobot} />
            <Route exact path="/robots/:id/edit" component={UpdateRobot} />
            <Route exact path="/projects" component={AllProjects} />
            <Route exact path="/projects/create" component={NewProject} />
            <Route exact path="/projects/:id/edit" component={UpdateProject} />
            <Route exact path="/projects/:id" component={SingleProject} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
