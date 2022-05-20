import React from 'react';
import { connect } from 'react-redux';
import { getAllRobots, createNewRobot } from '../redux/robots';
import { Link } from 'react-router-dom';
import NewRobot from './NewRobot';

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
class AllRobots extends React.Component {
  componentDidMount() {
    this.props.getAllRobotsInReact();
  }

  render() {
    let robots = this.props.allRobotsInReact;
    console.log(robots);
    return (
      <div>
        <h2 className="section-title"> All Robots </h2>
        <ul className="container">
          {Array.isArray(robots)
            ? robots.map((robot) => (
                <Link to={`/robots/${robot.id}`} key={robot.id}>
                  <div className="card">
                    <li>
                      <h3>{robot.name}</h3>
                      <img src={robot.imageUrl} />
                    </li>
                  </div>
                </Link>
              ))
            : 'No robots here'}
        </ul>
        <div>
          <h3>Add a new robot to the teams</h3>
          <NewRobot />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return { allRobotsInReact: state.robots };
};

const mapDispatch = (dispatch) => ({
  getAllRobotsInReact: () => dispatch(getAllRobots()),
});
export default connect(mapState, mapDispatch)(AllRobots);
