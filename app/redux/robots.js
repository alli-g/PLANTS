import axios from 'axios';

//ACTION TYPES
const GOT_ALL_ROBOTS = 'GOT_ALL_ROBOTS';

//ACTION CREATORS
export const setRobots = () => {};

export const fetchRobots = (robots) => ({
  type: GOT_ALL_ROBOTS,
  allRobots: robots,
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

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = [];

export default function robotsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_ROBOTS:
      return action.allRobots;
    default:
      return state;
  }
}
