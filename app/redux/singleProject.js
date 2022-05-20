import axios from 'axios';

//ACTION TYPES
const GOT_PROJECT = 'GOT_PROJECT';


//ACTION CREATORS
export const setProject = () => {};

export const fetchProject = (project) => ({
  type: GOT_PROJECT,
  oneProject: project,
});



//THUNKS

export const getOneProject = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/projects/${id}`);
      dispatch(fetchProject(data));
    } catch (error) {
      console.error(error);
    }
  };
};



// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = {};

export default function singleProjectReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_PROJECT:
      return action.oneProject;
    default:
      return state;
  }
}
