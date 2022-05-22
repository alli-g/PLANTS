import React from 'react';
import { connect } from 'react-redux';
import { updateOneProject, removeOneRobot } from '../redux/projects';
import { getOneProject } from '../redux/singleProject';
import { Link } from 'react-router-dom';

class SingleProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      robotsAssigned: [],
    };
    this.complete = this.complete.bind(this);
    this.unassign = this.unassign.bind(this);
  }
  componentDidMount() {
    this.props.getSingleProjectInReact(this.props.match.params.id).then(() => {
      let robotsAssigned = this.props.singleProject[0].robots;
      this.setState({ ...this.state, robotsAssigned });
    });
  }

  complete(evt) {
    evt.preventDefault();

    const completedPjt = { ...this.props.singleProject[0], complete: true };
    this.props.updateOneProject(completedPjt);
  }

  unassign(rbt) {
    const unrbt = { ...rbt, projectIdUnassign: this.props.singleProject[0].id };
    this.props.removeOneRobot(unrbt);
    let assignedRbts = [...this.state.robotsAssigned];
    assignedRbts = assignedRbts.filter((robot) => robot.id !== rbt.rbt.id);
    this.setState({ ...this.state, robotsAssigned: assignedRbts });
  }

  render() {
    let project = this.props.singleProject;
    let singleProject = project[0];
    let robotsAssigned = this.state.robotsAssigned;
    return (
      <div>
        {singleProject ? (
          <div>
            <h1> {singleProject.title}</h1>
            <p>{singleProject.description}</p>
            <p>
              {singleProject.complete
                ? 'This project is completed!!!'
                : 'This project still needs to be worked on'}
            </p>
            <ul>
              <li>Due by {singleProject.deadline.slice(0, 10)}</li>
              <li>The priority is {singleProject.priority} out of 10</li>
            </ul>
            <button type="button">
              <Link to={`/projects/${singleProject.id}/edit`}>
                Edit Project
              </Link>
            </button>
            <button type="button" onClick={this.complete}>
              Complete
            </button>

            <h3>Robots assigned to get this work done</h3>
            {robotsAssigned.length > 0 ? (
              <ul>
                {robotsAssigned.map((rbt) => {
                  return (
                    <p key={rbt.id}>
                      <Link to={`/robots/${rbt.id}`}>{rbt.name}</Link>
                      <button
                        type="button"
                        onClick={() => this.unassign({ rbt })}
                      >
                        Unassign
                      </button>
                    </p>
                  );
                })}
              </ul>
            ) : (
              <p>
                No workers, you should hire someone and maybe pay better so they
                don't leave :/
              </p>
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
  return { singleProject: state.singleProject };
};

const mapDispatch = (dispatch, { history }) => ({
  getSingleProjectInReact: (id) => dispatch(getOneProject(id)),
  updateOneProject: (id) => dispatch(updateOneProject(id, history)),
  removeOneRobot: (rbt) => dispatch(removeOneRobot(rbt, history)),
});

export default connect(mapState, mapDispatch)(SingleProject);
