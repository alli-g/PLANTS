import axios from 'axios';

//ACTION TYPES
const GOT_ALL_PROJECTS = 'GOT_ALL_PROJECTS';
const CREATE_PROJECT = 'CREATE_PROJECT';

//ACTION CREATORS
export const setProjects = () => {};

export const fetchProjects = (projects) => ({
  type: GOT_ALL_PROJECTS,
  allProjects: projects,
});

export const createProject = (project) => ({
  type: CREATE_PROJECT,
  project,
});

//THUNKS

export const getAllProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/projects');
      dispatch(fetchProjects(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createNewProject = (project, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/projects', project);
      dispatch(createProject(data));
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = [];

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PROJECTS:
      return action.allProjects;
    case CREATE_PROJECT:
      return [...state, action.project];
    default:
      return state;
  }
}
