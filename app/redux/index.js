import { combineReducers } from 'redux';
import projectsReducer from './projects';
import robotsReducer from './robots';
import singleProjectReducer from './singleProject';
import singleRobotReducer from './singleRobot';

const appReducer = combineReducers({
  projects: projectsReducer,
  robots: robotsReducer,
  singleProject: singleProjectReducer,
  singleRobot: singleRobotReducer,
});

export default appReducer;
