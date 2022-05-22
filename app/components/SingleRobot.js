import React from 'react';
import { connect } from 'react-redux';
import { getOneRobot } from '../redux/singleRobot';
import { Link } from 'react-router-dom';

class SingleRobot extends React.Component {
  componentDidMount() {
    this.props.getSingleRobotInReact(this.props.match.params.id);
  }

  render() {
    let robot = this.props.singleRobot;
    let singleRobot = robot[0];
    return (
      <div>
        {singleRobot ? (
          <div>
            <img src={singleRobot.imageUrl} />
            <h1> {singleRobot.name}</h1>
            <ul>
              <li>Fueled by {singleRobot.fuelType}</li>
              <li>Currently sitting at {singleRobot.fuelLevel}%</li>
            </ul>
            <button>
              <Link to={`/robots/${singleRobot.id}/edit`}>Edit Robot</Link>
            </button>
            <h3>Assigned Projects</h3>
            {singleRobot.projects.length > 0 ? (
              <ul>
                {singleRobot.projects.map((prj) => {
                  return (
                    <Link to={`/projects/${prj.id}`} key={prj.id}>
                      {prj.title}
                    </Link>
                  );
                })}
              </ul>
            ) : (
              <p>No assignments yet, check back laters</p>
            )}
          </div>
        ) : (
          <p>No robot with that ID</p>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return { singleRobot: state.singleRobot };
};

const mapDispatch = (dispatch) => ({
  getSingleRobotInReact: (id) => dispatch(getOneRobot(id)),
});

export default connect(mapState, mapDispatch)(SingleRobot);
