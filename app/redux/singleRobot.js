import axios from 'axios';

//ACTION TYPES
const GOT_ROBOT = 'GOT_ROBOT';

//ACTION CREATORS
export const setRobot = () => {};

export const fetchRobot = (robot) => ({
  type: GOT_ROBOT,
  oneRobot: robot,
});

//THUNKS

export const getOneRobot = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/robots/${id}`);
      dispatch(fetchRobot(data));
    } catch (err) {
      console.error(err);
    }
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = {};

export default function singleRobotReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ROBOT:
      return action.oneRobot;
    default:
      return state;
  }
}
