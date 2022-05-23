import React from 'react';
import { connect } from 'react-redux';
import { getOneRobot } from '../redux/singleRobot';
import { removeOneProject } from '../redux/robots';
import { Link } from 'react-router-dom';

class SingleRobot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsAssigned: [],
    };

    this.unassign = this.unassign.bind(this);
  }

  componentDidMount() {
    this.props.getSingleRobotInReact(this.props.match.params.id).then(() => {
      let projectsAssigned = this.props.singleRobot[0].projects;
      this.setState({ ...this.state, projectsAssigned });
    });
  }

  unassign(pjt) {
    const unpjt = { ...pjt, robotIdUnassign: this.props.singleRobot[0].id };
    this.props.removeOneProject(unpjt);
    let assignedPjts = [...this.state.projectsAssigned];
    assignedPjts = assignedPjts.filter((project) => project.id !== pjt.pjt.id);
    this.setState({ ...this.state, projectsAssigned: assignedPjts });
  }

  render() {
    let robot = this.props.singleRobot;
    let singleRobot = robot[0];
    let projects = this.state.projectsAssigned;
    return (
      <div>
        {singleRobot ? (
          <div className="robot">
            <img src={singleRobot.imageUrl} />
            <h1> {singleRobot.name}</h1>
            <ul>
              <li>Fueled by {singleRobot.fuelType}</li>
              <li>Currently sitting at {singleRobot.fuelLevel}%</li>
            </ul>
            <button type="button">
              <Link to={`/robots/${singleRobot.id}/edit`}>Edit Robot</Link>
            </button>
            <h3>Assigned Projects</h3>
            {projects.length > 0 ? (
              <ul>
                {projects.map((pjt) => {
                  return (
                    <p key={pjt.id}>
                      <Link to={`/projects/${pjt.id}`}>{pjt.title}</Link>
                      <button
                        type="button"
                        onClick={() => this.unassign({ pjt })}
                      >
                        Unassign
                      </button>
                    </p>
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

const mapDispatch = (dispatch, { history }) => ({
  getSingleRobotInReact: (id) => dispatch(getOneRobot(id)),
  removeOneProject: (pjt) => dispatch(removeOneProject(pjt, history)),
});

export default connect(mapState, mapDispatch)(SingleRobot);
