import axios from 'axios';

//ACTION TYPES
const GOT_ALL_ROBOTS = 'GOT_ALL_ROBOTS';
const CREATE_ROBOT = 'CREATE_ROBOT';
const DELETE_ROBOT = 'DELETE_ROBOT';

//ACTION CREATORS
export const setRobots = () => {};

export const fetchRobots = (robots) => ({
  type: GOT_ALL_ROBOTS,
  allRobots: robots,
});

export const createRobot = (robot) => ({
  type: CREATE_ROBOT,
  robot,
});

export const deleteRobot = (robot) => ({
  type: DELETE_ROBOT,
  robot,
});

//THUNKS

export const getAllRobots = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/robots');
      dispatch(fetchRobots(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const createNewRobot = (robot, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/robots', robot);
      dispatch(createRobot(data));
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteOneRobot = (id, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`api/robots/${id}`);
      dispatch(deleteRobot(data));
      history.push('/robots');
    } catch (error) {
      console.log(error);
    }
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = [];

export default function robotsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_ROBOTS:
      return action.allRobots;
    case DELETE_ROBOT:
      return state.filter((rbt) => rbt.id !== action.robot.id);
    case CREATE_ROBOT:
      return [...state, action.robot];
    default:
      return state;
  }
}
