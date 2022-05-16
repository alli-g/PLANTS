import { combineReducers } from 'redux';
import projectsReducer from './projects';
import robotsReducer from './robots';

const appReducer = combineReducers({
  projects: projectsReducer,
  robots: robotsReducer,
});

export default appReducer;
